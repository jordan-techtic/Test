"""Shared pytest fixtures for integration tests."""

import os
from datetime import timedelta
from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import text
from sqlalchemy.orm import Session

# Load test env before application imports.
os.environ.setdefault(
    "DATABASE_URL",
    os.getenv(
        "TEST_DATABASE_URL",
        "postgresql://postgres:1234@127.0.0.1:5432/marketing_cal",
    ),
)
os.environ.setdefault("JWT_SECRET", "test-jwt-secret-key-for-pytest")
os.environ.setdefault("JWT_ALGORITHM", "HS256")
os.environ.setdefault("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
os.environ.setdefault("REFRESH_TOKEN_EXPIRE_DAYS", "7")
os.environ.setdefault("AUTH_STRATEGY", "jwt")
os.environ.setdefault("KLAVIYO_API_KEY", "test-klaviyo-key")
os.environ.setdefault("KLAVIYO_API_BASE_URL", "https://a.klaviyo.com/api")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000")
os.environ.setdefault("LOG_LEVEL", "ERROR")

from app.core.config import get_settings  # noqa: E402
from app.core.security import create_access_token  # noqa: E402
from app.db.session import SessionLocal, engine  # noqa: E402
from app.main import create_app  # noqa: E402
from app.models.marketing_team_member import MarketingTeamMember  # noqa: E402
from app.schemas.marketing_activity import PerformanceMetrics  # noqa: E402
from app.services.password_service import hash_password  # noqa: E402

TABLES_TO_TRUNCATE = (
    "password_reset_tokens",
    "marketing_activities",
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
    """Mock all Klaviyo external calls for self-contained tests."""

    def _mock_send_password_reset_email(self, to_email: str, reset_token: str) -> None:
        return None

    def _mock_get_metrics(self, campaign_code: str) -> PerformanceMetrics:
        return PerformanceMetrics(
            revenue=1250.50,
            open_rate=0.42,
            click_rate=0.18,
            delivered_orders=37,
        )

    monkeypatch.setattr(
        "app.services.klaviyo_email_service.KlaviyoEmailService.send_password_reset_email",
        _mock_send_password_reset_email,
    )
    monkeypatch.setattr(
        "app.services.klaviyo_performance_service.KlaviyoPerformanceService.get_metrics_by_campaign_code",
        _mock_get_metrics,
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
    """Admin-equivalent member with performance access."""
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


def _token_for(user: MarketingTeamMember) -> str:
    """Return a valid JWT access token for the given user."""
    return create_access_token(str(user.id))


@pytest.fixture
def admin_token(admin_user: MarketingTeamMember) -> str:
    """JWT access token for admin-equivalent user."""
    return _token_for(admin_user)


@pytest.fixture
def user_token(regular_user: MarketingTeamMember) -> str:
    """JWT access token for regular user."""
    return _token_for(regular_user)


@pytest.fixture
def viewer_token(viewer_user: MarketingTeamMember) -> str:
    """JWT access token for unauthorized viewer user."""
    return _token_for(viewer_user)


@pytest.fixture
def expired_token(regular_user: MarketingTeamMember) -> str:
    """Expired JWT access token for auth failure tests."""
    return create_access_token(str(regular_user.id), expires_delta=timedelta(seconds=-1))


@pytest.fixture
def auth_headers(user_token: str) -> dict[str, str]:
    """Authorization headers for regular user."""
    return {"Authorization": f"Bearer {user_token}"}


@pytest.fixture
def admin_auth_headers(admin_token: str) -> dict[str, str]:
    """Authorization headers for admin-equivalent user."""
    return {"Authorization": f"Bearer {admin_token}"}


@pytest.fixture
def client(db: Session) -> TestClient:
    """Return a FastAPI test client bound to a live database session."""
    application = create_app()
    return TestClient(application)


@pytest.fixture
def future_date() -> str:
    """Return an ISO date string for a future activity."""
    from datetime import date

    return (date.today() + timedelta(days=30)).isoformat()
