"""Integration tests for marketing team member auth (CMC-50)."""

from fastapi.testclient import TestClient

from app.models.marketing_team_member import MarketingTeamMember


def test_login_with_email_success(client: TestClient, regular_user: MarketingTeamMember) -> None:
    """CMC-50: Users can log in using registered email and password."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "user@test.com", "password": "TestUser123!"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["access_token"]
    assert body["data"]["refresh_token"]
    assert body["data"]["token_type"] == "bearer"


def test_login_with_username_success(client: TestClient, regular_user: MarketingTeamMember) -> None:
    """CMC-50: Users can log in using registered username and password."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "regular_user", "password": "TestUser123!"},
    )
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_login_invalid_credentials_returns_401(client: TestClient, regular_user: MarketingTeamMember) -> None:
    """CMC-50: Invalid login attempts return 401 with error envelope."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "user@test.com", "password": "WrongPass1!"},
    )
    assert response.status_code == 401
    body = response.json()
    assert body["success"] is False
    assert body["error"]["code"] == "INVALID_CREDENTIALS"


def test_login_inactive_account_returns_403(client: TestClient, inactive_user: MarketingTeamMember) -> None:
    """CMC-50: Inactive users cannot log in."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "inactive@test.com", "password": "TestInactive123!"},
    )
    assert response.status_code == 403
    assert response.json()["error"]["code"] == "ACCOUNT_INACTIVE"


def test_login_unauthorized_account_returns_403(client: TestClient, viewer_user: MarketingTeamMember) -> None:
    """CMC-50: Access restricted to authorized users only."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "viewer@test.com", "password": "TestViewer123!"},
    )
    assert response.status_code == 403
    assert response.json()["error"]["code"] == "NOT_AUTHORIZED"


def test_forgot_password_registered_email(client: TestClient, regular_user: MarketingTeamMember) -> None:
    """CMC-50: Registered users can initiate forgot-password recovery."""
    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={"email": "user@test.com"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert "password reset" in body["message"].lower()


def test_forgot_password_unregistered_email_generic_response(
    client: TestClient,
    new_user_data: dict[str, str],
) -> None:
    """CMC-50: Unregistered email returns generic message without revealing existence."""
    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={"email": new_user_data["email"]},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert "if an account exists" in body["message"].lower()


def test_forgot_password_invalid_email_returns_422(client: TestClient) -> None:
    """Edge case: invalid email format returns validation error."""
    response = client.post(
        "/api/v1/marketing-team-member/forgot-password",
        json={"email": "not-an-email"},
    )
    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_login_empty_password_returns_422(client: TestClient) -> None:
    """Edge case: password shorter than minimum length fails validation."""
    response = client.post(
        "/api/v1/marketing-team-member/login",
        json={"email_or_username": "user@test.com", "password": "short"},
    )
    assert response.status_code == 422


def test_calendar_requires_authentication_401(client: TestClient) -> None:
    """CMC-50: Access control enforced — calendar requires bearer token."""
    response = client.get("/api/v1/marketing-team-member/calendar?year=2026")
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "UNAUTHORIZED"


def test_calendar_rejects_expired_token_401(
    client: TestClient,
    expired_token: str,
) -> None:
    """Auth test: expired JWT is rejected."""
    response = client.get(
        "/api/v1/marketing-team-member/calendar?year=2026",
        headers={"Authorization": f"Bearer {expired_token}"},
    )
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "INVALID_TOKEN"


def test_calendar_rejects_unauthorized_member_403(
    client: TestClient,
    viewer_token: str,
) -> None:
    """CMC-50: Authorized-only members can access protected resources."""
    response = client.get(
        "/api/v1/marketing-team-member/calendar?year=2026",
        headers={"Authorization": f"Bearer {viewer_token}"},
    )
    assert response.status_code == 403
    assert response.json()["error"]["code"] == "NOT_AUTHORIZED"
