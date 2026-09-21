"""Acceptance-criteria integration tests mapping each ticket AC to a runnable test."""

from pathlib import Path

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.marketing_team_member import MarketingTeamMember


def test_ac_cmc50_password_recovery_functionality_creates_db_token(
    client: TestClient,
    regular_user: MarketingTeamMember,
    db: Session,
) -> None:
    """CMC-50: Password recovery functionality persists a reset token."""
    from sqlalchemy import text

    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={"email": "user@test.com"},
    )
    assert response.status_code == 200
    row = db.execute(
        text(
            "SELECT token_hash, expires_at, used_at "
            "FROM password_reset_tokens LIMIT 1"
        )
    ).fetchone()
    assert row is not None
    assert row.token_hash
    assert row.expires_at is not None
    assert row.used_at is None


def test_ac_cmc50_user_login_functionality_full_envelope(
    client: TestClient,
    regular_user: MarketingTeamMember,
) -> None:
    """CMC-50: User login functionality returns complete response envelope."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "user@test.com", "password": "TestUser123!"},
    )
    body = response.json()
    for key in ("success", "message", "role", "organization", "data"):
        assert key in body
    for key in ("access_token", "refresh_token", "token_type", "expires_in"):
        assert key in body["data"]


def test_ac_cmc50_api_supports_frontend_success_state(client: TestClient) -> None:
    """CMC-50 proxy: API exposes success state fields for frontend consumption."""
    response = client.get("/api/v1/health")
    body = response.json()
    assert body["success"] is True
    assert isinstance(body["message"], str)


def test_ac_cmc50_api_supports_frontend_error_state(
    client: TestClient,
    regular_user: MarketingTeamMember,
) -> None:
    """CMC-50 proxy: API exposes structured error state for frontend consumption."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "user@test.com", "password": "WrongPass1!"},
    )
    body = response.json()
    assert body["success"] is False
    assert body["error"]["code"]
    assert body["message"]


def test_ac_cmc50_openapi_provides_component_specs(client: TestClient) -> None:
    """CMC-50 proxy: OpenAPI component specs document request/response schemas."""
    schema = client.get("/openapi.json").json()
    login_post = schema["paths"]["/api/v1/marketing-team-member/login"]["post"]
    assert "requestBody" in login_post
    assert "responses" in login_post
    assert "200" in login_post["responses"]


def test_ac_cmc50_openapi_login_endpoint_has_summary_and_description(client: TestClient) -> None:
    """CMC-50 proxy: Login endpoint annotated for engineering handoff."""
    login = client.get("/openapi.json").json()["paths"][
        "/api/v1/marketing-team-member/login"
    ]["post"]
    assert login.get("summary")
    assert login.get("description")
    assert login.get("operationId") == "marketingTeamMemberLogin"


def test_ac_cmc50_openapi_forgot_password_endpoint_documented(client: TestClient) -> None:
    """CMC-50 proxy: Forgot-password endpoint documented for frontend integration."""
    endpoint = client.get("/openapi.json").json()["paths"][
        "/api/v1/marketing-team-member/forgot-password"
    ]["post"]
    assert endpoint.get("summary")
    assert endpoint.get("operationId") == "marketingTeamMemberForgotPassword"


def test_ac_cmc50_public_paths_allow_unauthenticated_login(client: TestClient) -> None:
    """CMC-50 proxy: Primary login action reachable without prior authentication."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "nouser@test.com", "password": "NoUser123!"},
    )
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "INVALID_CREDENTIALS"


def test_ac_cmc50_public_paths_allow_unauthenticated_forgot_password(client: TestClient) -> None:
    """CMC-50 proxy: Password recovery action reachable without prior authentication."""
    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={"email": "anyone@test.com"},
    )
    assert response.status_code == 200


def test_ac_cmc50_response_includes_role_for_navigation_context(
    client: TestClient,
    admin_user: MarketingTeamMember,
) -> None:
    """CMC-50 proxy: Response role field supports frontend navigation/routing context."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "admin@test.com", "password": "TestAdmin123!"},
    )
    assert response.json()["role"] == "admin"


def test_ac_cmc50_validation_error_includes_field_details(client: TestClient) -> None:
    """CMC-50 proxy: Validation errors provide field-level details for UI feedback."""
    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={"email": "bad"},
    )
    details = response.json()["error"]["details"]
    assert isinstance(details, list)
    assert details[0]["field"]
    assert details[0]["message"]


def test_ac_cmc50_health_endpoint_is_public(client: TestClient) -> None:
    """CMC-50 proxy: Health endpoint accessible without auth for layout/system checks."""
    assert client.get("/api/v1/health").status_code == 200


def test_ac_cmc8_lint_config_present() -> None:
    """CMC-8: Lint configuration file exists for documented flake8 command."""
    assert (Path(__file__).resolve().parents[2] / ".flake8").is_file()


def test_ac_cmc8_requirements_declares_pytest() -> None:
    """CMC-8: Test runner declared in requirements for documented pytest command."""
    requirements = (
        Path(__file__).resolve().parents[2] / "requirements.txt"
    ).read_text(encoding="utf-8")
    assert "pytest" in requirements
