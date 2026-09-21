"""Shared pytest fixtures for unit and integration tests."""

import os
from collections.abc import Generator
from datetime import timedelta
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import text
from sqlalchemy.orm import Session


def _load_env_file(path: Path) -> None:
    """Load KEY=VALUE pairs from a dotenv file into os.environ when unset."""
    if not path.is_file():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def _bootstrap_test_env() -> None:
    """Bootstrap test configuration from .env.test and process environment."""
    repo_root = Path(__file__).resolve().parents[1]
    _load_env_file(repo_root / ".env.test")

    test_database_url = os.getenv("TEST_DATABASE_URL")
    if test_database_url:
        os.environ.setdefault("DATABASE_URL", test_database_url)

    os.environ.setdefault("JWT_ALGORITHM", "HS256")
    os.environ.setdefault("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
    os.environ.setdefault("REFRESH_TOKEN_EXPIRE_DAYS", "7")
    os.environ.setdefault("AUTH_STRATEGY", "jwt")
    os.environ.setdefault("KLAVIYO_API_BASE_URL", "https://a.klaviyo.com/api")
    os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000")
    os.environ.setdefault("LOG_LEVEL", "ERROR")

    missing = [
        name
        for name in ("DATABASE_URL", "JWT_SECRET")
        if not os.getenv(name)
    ]
    if missing:
        raise RuntimeError(
            "Missing required test environment variables: "
            f"{', '.join(missing)}. "
            "Set them in the environment or in .env.test (see .env.example)."
        )


_bootstrap_test_env()

from app.core.config import get_settings
from app.core.security import create_access_token, create_refresh_token
from app.db.session import SessionLocal, engine
from app.main import create_app
from app.models.marketing_team_member import MarketingTeamMember
from app.services.password_service import hash_password

TABLES_TO_TRUNCATE = (
    "password_reset_tokens",
    "marketing_team_members",
)


@pytest.fixture(scope="session", autouse=True)
def clear_settings_cache() -> None:
    """Clear settings cache so tests use environment defaults."""
    get_settings.cache_clear()


@pytest.fixture(scope="session")
def verify_database_connectivity() -> None:
    """Verify PostgreSQL connectivity before integration tests run."""
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1")).scalar()
        assert result == 1


@pytest.fixture(autouse=True)
def mock_klaviyo_services(monkeypatch: pytest.MonkeyPatch) -> None:
    """Mock Klaviyo external calls for self-contained tests."""

    def _mock_send_password_reset_email(self, to_email: str, reset_token: str) -> None:
        return None

    monkeypatch.setattr(
        "app.services.klaviyo_email_service.KlaviyoEmailService.send_password_reset_email",
        _mock_send_password_reset_email,
    )


@pytest.fixture
def db(verify_database_connectivity: None) -> Generator[Session, None, None]:
    """Provide a database session and truncate app tables after each test."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.rollback()
        session.close()
        cleanup = SessionLocal()
        try:
            for table in TABLES_TO_TRUNCATE:
                cleanup.execute(text(f"TRUNCATE TABLE {table} RESTART IDENTITY CASCADE"))
            cleanup.commit()
        finally:
            cleanup.close()


def _insert_member(
    db: Session,
    *,
    email: str,
    username: str,
    password: str,
    is_active: bool = True,
    is_authorized: bool = True,
    has_performance_access: bool = False,
) -> MarketingTeamMember:
    """Insert a marketing team member into the test database."""
    member = MarketingTeamMember(
        email=email,
        username=username,
        hashed_password=hash_password(password),
        is_active=is_active,
        is_authorized=is_authorized,
        has_performance_access=has_performance_access,
    )
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


@pytest.fixture
def admin_user(db: Session) -> MarketingTeamMember:
    """Admin member with performance access (maps to role=admin)."""
    return _insert_member(
        db,
        email="admin@test.com",
        username="admin_user",
        password="TestAdmin123!",
        has_performance_access=True,
    )


@pytest.fixture
def regular_user(db: Session) -> MarketingTeamMember:
    """Standard authorized marketing team member."""
    return _insert_member(
        db,
        email="user@test.com",
        username="regular_user",
        password="TestUser123!",
    )


@pytest.fixture
def viewer_user(db: Session) -> MarketingTeamMember:
    """Unauthorized member used for access-control tests."""
    return _insert_member(
        db,
        email="viewer@test.com",
        username="viewer_user",
        password="TestViewer123!",
        is_authorized=False,
    )


@pytest.fixture
def inactive_user(db: Session) -> MarketingTeamMember:
    """Inactive account that cannot log in."""
    return _insert_member(
        db,
        email="inactive@test.com",
        username="inactive_user",
        password="TestInactive123!",
        is_active=False,
    )


NEW_USER_DATA = {
    "email": "newuser@test.com",
    "username": "new_user",
    "password": "NewUser123!",
}


@pytest.fixture
def new_user_data() -> dict[str, str]:
    """Credentials for a user not yet inserted into the database."""
    return NEW_USER_DATA.copy()


def _login_access_token(client: TestClient, email_or_username: str, password: str) -> str:
    """Obtain an access token via the login endpoint."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": email_or_username, "password": password},
    )
    assert response.status_code == 200
    return response.json()["data"]["access_token"]


@pytest.fixture
def admin_access_token(client: TestClient, admin_user: MarketingTeamMember) -> str:
    """Valid JWT access token for the admin user."""
    return _login_access_token(client, "admin@test.com", "TestAdmin123!")


@pytest.fixture
def user_access_token(client: TestClient, regular_user: MarketingTeamMember) -> str:
    """Valid JWT access token for the regular user."""
    return _login_access_token(client, "user@test.com", "TestUser123!")


@pytest.fixture
def expired_token(regular_user: MarketingTeamMember) -> str:
    """Expired JWT access token for auth failure tests."""
    return create_access_token(str(regular_user.id), expires_delta=timedelta(seconds=-1))


@pytest.fixture
def refresh_token(regular_user: MarketingTeamMember) -> str:
    """Valid refresh token (rejected by access-token middleware)."""
    return create_refresh_token(str(regular_user.id))


@pytest.fixture
def client(db: Session) -> TestClient:
    """Return a FastAPI test client bound to a live database session."""
    return TestClient(create_app())
