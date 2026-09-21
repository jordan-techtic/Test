"""Unit tests for ForgotPasswordService."""

from unittest.mock import MagicMock

from app.core.config import Settings
from app.models.marketing_team_member import MarketingTeamMember
from app.services.forgot_password_service import GENERIC_MESSAGE, ForgotPasswordService
from app.services.password_service import hash_password


def _make_settings() -> Settings:
    """Return test settings for forgot-password service."""
    return Settings(
        database_url="postgresql://postgres:1234@127.0.0.1:5432/marketing_cal",
        password_reset_token_expire_minutes=60,
    )


def test_initiate_reset_known_user_creates_token_and_sends_email() -> None:
    """Registered active user triggers token persistence and Klaviyo email."""
    user = MarketingTeamMember(
        email="user@test.com",
        username="regular_user",
        hashed_password=hash_password("TestUser123!"),
        is_active=True,
        is_authorized=True,
    )
    user_repository = MagicMock()
    user_repository.get_by_email.return_value = user
    token_repository = MagicMock()
    klaviyo_service = MagicMock()
    service = ForgotPasswordService(
        user_repository=user_repository,
        token_repository=token_repository,
        klaviyo_service=klaviyo_service,
        settings=_make_settings(),
    )

    response = service.initiate_reset("user@test.com")

    assert response.success is True
    assert response.message == GENERIC_MESSAGE
    token_repository.create_token.assert_called_once()
    klaviyo_service.send_password_reset_email.assert_called_once()


def test_initiate_reset_unknown_email_returns_generic_message() -> None:
    """Unknown email returns generic success without side effects."""
    user_repository = MagicMock()
    user_repository.get_by_email.return_value = None
    token_repository = MagicMock()
    klaviyo_service = MagicMock()
    service = ForgotPasswordService(
        user_repository=user_repository,
        token_repository=token_repository,
        klaviyo_service=klaviyo_service,
        settings=_make_settings(),
    )

    response = service.initiate_reset("unknown@test.com")

    assert response.success is True
    assert response.message == GENERIC_MESSAGE
    token_repository.create_token.assert_not_called()
    klaviyo_service.send_password_reset_email.assert_not_called()


def test_initiate_reset_inactive_user_no_email_sent() -> None:
    """Inactive user does not trigger reset email or token creation."""
    user = MarketingTeamMember(
        email="inactive@test.com",
        username="inactive_user",
        hashed_password=hash_password("TestInactive123!"),
        is_active=False,
        is_authorized=True,
    )
    user_repository = MagicMock()
    user_repository.get_by_email.return_value = user
    token_repository = MagicMock()
    klaviyo_service = MagicMock()
    service = ForgotPasswordService(
        user_repository=user_repository,
        token_repository=token_repository,
        klaviyo_service=klaviyo_service,
        settings=_make_settings(),
    )

    response = service.initiate_reset("inactive@test.com")

    assert response.success is True
    token_repository.create_token.assert_not_called()
    klaviyo_service.send_password_reset_email.assert_not_called()
