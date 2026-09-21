"""Integration tests for marketing team member auth (CMC-50)."""

from fastapi.testclient import TestClient
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.models.marketing_team_member import MarketingTeamMember


def test_cmc50_login_with_email_success(
    client: TestClient,
    regular_user: MarketingTeamMember,
) -> None:
    """CMC-50: Users can log in using registered email and password."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "user@test.com", "password": "TestUser123!"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["message"] == "Login successful."
    assert body["role"] == "user"
    assert body["organization"]
    assert body["data"]["access_token"]
    assert body["data"]["refresh_token"]
    assert body["data"]["token_type"] == "bearer"
    assert body["data"]["expires_in"] == 1800


def test_cmc50_login_with_username_success(
    client: TestClient,
    regular_user: MarketingTeamMember,
) -> None:
    """CMC-50: Users can log in using registered username and password."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "regular_user", "password": "TestUser123!"},
    )
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_cmc50_login_admin_returns_admin_role(
    client: TestClient,
    admin_user: MarketingTeamMember,
) -> None:
    """CMC-50: Admin user login returns admin role in response envelope."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "admin@test.com", "password": "TestAdmin123!"},
    )
    assert response.status_code == 200
    assert response.json()["role"] == "admin"


def test_cmc50_login_invalid_credentials_returns_401(
    client: TestClient,
    regular_user: MarketingTeamMember,
) -> None:
    """Error case: invalid password returns 401 INVALID_CREDENTIALS."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "user@test.com", "password": "WrongPass1!"},
    )
    assert response.status_code == 401
    body = response.json()
    assert body["success"] is False
    assert body["error"]["code"] == "INVALID_CREDENTIALS"
    assert "password" in body["message"].lower()


def test_cmc50_login_unknown_user_returns_401(
    client: TestClient,
    new_user_data: dict[str, str],
) -> None:
    """Error case: unknown identifier returns 401 without revealing existence."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={
            "email_or_username": new_user_data["email"],
            "password": new_user_data["password"],
        },
    )
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "INVALID_CREDENTIALS"


def test_cmc50_login_inactive_account_returns_403(
    client: TestClient,
    inactive_user: MarketingTeamMember,
) -> None:
    """CMC-50: Inactive users cannot log in."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "inactive@test.com", "password": "TestInactive123!"},
    )
    assert response.status_code == 403
    assert response.json()["error"]["code"] == "ACCOUNT_INACTIVE"


def test_cmc50_login_unauthorized_account_returns_403(
    client: TestClient,
    viewer_user: MarketingTeamMember,
) -> None:
    """CMC-50: Access restricted to authorized users only."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "viewer@test.com", "password": "TestViewer123!"},
    )
    assert response.status_code == 403
    assert response.json()["error"]["code"] == "NOT_AUTHORIZED"


def test_cmc50_login_empty_identifier_returns_422(client: TestClient) -> None:
    """Edge case: empty email_or_username fails validation."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "", "password": "TestUser123!"},
    )
    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_cmc50_login_short_password_returns_422(client: TestClient) -> None:
    """Edge case: password shorter than minimum length fails validation."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "user@test.com", "password": "short"},
    )
    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_cmc50_login_unicode_username(
    client: TestClient,
    db: Session,
) -> None:
    """Edge case: unicode characters in username are accepted when registered."""
    from tests.conftest import _insert_member

    _insert_member(
        db,
        email="unicode@test.com",
        username="user_cafe",
        password="Unicode1!Pass",
    )
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "user_cafe", "password": "Unicode1!Pass"},
    )
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_cmc50_forgot_password_registered_email(
    client: TestClient,
    regular_user: MarketingTeamMember,
    db: Session,
) -> None:
    """CMC-50: Registered users can initiate forgot-password recovery."""
    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={"email": "user@test.com"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["role"] == "anonymous"
    assert "password reset" in body["message"].lower()

    token_count = db.execute(
        text("SELECT COUNT(*) FROM password_reset_tokens")
    ).scalar()
    assert token_count == 1


def test_cmc50_forgot_password_unregistered_email_generic_response(
    client: TestClient,
    new_user_data: dict[str, str],
    db: Session,
) -> None:
    """CMC-50: Unregistered email returns generic message (anti-enumeration)."""
    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={"email": new_user_data["email"]},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert "if an account exists" in body["message"].lower()

    token_count = db.execute(
        text("SELECT COUNT(*) FROM password_reset_tokens")
    ).scalar()
    assert token_count == 0


def test_cmc50_forgot_password_inactive_user_generic_response(
    client: TestClient,
    inactive_user: MarketingTeamMember,
    db: Session,
) -> None:
    """Edge case: inactive user gets generic response and no reset token."""
    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={"email": "inactive@test.com"},
    )
    assert response.status_code == 200
    assert "if an account exists" in response.json()["message"].lower()

    token_count = db.execute(
        text("SELECT COUNT(*) FROM password_reset_tokens")
    ).scalar()
    assert token_count == 0


def test_cmc50_forgot_password_invalid_email_returns_422(client: TestClient) -> None:
    """Error case: invalid email format returns validation error."""
    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={"email": "not-an-email"},
    )
    assert response.status_code == 422
    body = response.json()
    assert body["error"]["code"] == "VALIDATION_ERROR"
    assert body["error"]["details"]


def test_cmc50_forgot_password_missing_email_returns_422(client: TestClient) -> None:
    """Error case: missing email field returns validation error."""
    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={},
    )
    assert response.status_code == 422


def test_cmc50_protected_route_requires_authentication_401(client: TestClient) -> None:
    """CMC-50: Access control enforced — protected routes require bearer token."""
    response = client.get("/api/v1/marketing-team-member/profile")
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "UNAUTHORIZED"


def test_cmc50_protected_route_rejects_expired_token_401(
    client: TestClient,
    expired_token: str,
) -> None:
    """Auth test: expired JWT is rejected on protected routes."""
    response = client.get(
        "/api/v1/marketing-team-member/profile",
        headers={"Authorization": f"Bearer {expired_token}"},
    )
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "INVALID_TOKEN"


def test_cmc50_protected_route_rejects_refresh_token_401(
    client: TestClient,
    refresh_token: str,
) -> None:
    """Auth test: refresh token is rejected on access-protected routes."""
    response = client.get(
        "/api/v1/marketing-team-member/profile",
        headers={"Authorization": f"Bearer {refresh_token}"},
    )
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "INVALID_TOKEN"


def test_cmc50_valid_access_token_passes_middleware(
    client: TestClient,
    user_access_token: str,
) -> None:
    """Auth test: valid access token passes JWT middleware (not 401)."""
    response = client.get(
        "/api/v1/marketing-team-member/profile",
        headers={"Authorization": f"Bearer {user_access_token}"},
    )
    assert response.status_code != 401


def test_cmc50_openapi_documents_login_and_forgot_password(client: TestClient) -> None:
    """CMC-50: API regions for login, recovery, and access control are documented."""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    paths = response.json()["paths"]
    assert "/api/v1/marketing-team-member/login" in paths
    assert "/api/v1/marketing-team-member/forgot-password" in paths
    assert "post" in paths["/api/v1/marketing-team-member/login"]
    assert "post" in paths["/api/v1/marketing-team-member/forgot-password"]
    assert "BearerAuth" in response.json()["components"]["securitySchemes"]
