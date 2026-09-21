"""Unit tests for AuthService login logic."""

import uuid
from unittest.mock import MagicMock

import pytest

from app.exceptions.http_exceptions import ForbiddenError, UnauthorizedError
from app.models.marketing_team_member import MarketingTeamMember
from app.services.auth_service import AuthService
from app.services.password_service import hash_password


def _make_user(**overrides: object) -> MarketingTeamMember:
    """Build a marketing team member for service unit tests."""
    defaults = {
        "email": "user@test.com",
        "username": "regular_user",
        "hashed_password": hash_password("TestUser123!"),
        "is_active": True,
        "is_authorized": True,
        "has_performance_access": False,
    }
    defaults.update(overrides)
    user = MarketingTeamMember(**defaults)
    user.id = uuid.uuid4()
    return user


def test_login_success_returns_tokens() -> None:
    """Successful login returns JWT token pair in response envelope."""
    user = _make_user()
    repository = MagicMock()
    repository.get_by_email_or_username.return_value = user
    service = AuthService(repository)

    response = service.login("user@test.com", "TestUser123!")

    assert response.success is True
    assert response.data.access_token
    assert response.data.refresh_token
    assert response.data.token_type == "bearer"
    assert response.role == "user"


def test_login_invalid_password_raises_unauthorized() -> None:
    """Invalid password raises UnauthorizedError with INVALID_CREDENTIALS."""
    user = _make_user()
    repository = MagicMock()
    repository.get_by_email_or_username.return_value = user
    service = AuthService(repository)

    with pytest.raises(UnauthorizedError) as exc_info:
        service.login("user@test.com", "WrongPass1!")

    assert exc_info.value.code == "INVALID_CREDENTIALS"


def test_login_inactive_raises_forbidden() -> None:
    """Inactive account raises ForbiddenError with ACCOUNT_INACTIVE."""
    user = _make_user(is_active=False)
    repository = MagicMock()
    repository.get_by_email_or_username.return_value = user
    service = AuthService(repository)

    with pytest.raises(ForbiddenError) as exc_info:
        service.login("user@test.com", "TestUser123!")

    assert exc_info.value.code == "ACCOUNT_INACTIVE"


def test_login_unauthorized_raises_forbidden() -> None:
    """Unauthorized account raises ForbiddenError with NOT_AUTHORIZED."""
    user = _make_user(is_authorized=False)
    repository = MagicMock()
    repository.get_by_email_or_username.return_value = user
    service = AuthService(repository)

    with pytest.raises(ForbiddenError) as exc_info:
        service.login("user@test.com", "TestUser123!")

    assert exc_info.value.code == "NOT_AUTHORIZED"
