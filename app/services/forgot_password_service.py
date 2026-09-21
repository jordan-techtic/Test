"""Forgot password business logic."""

import hashlib
import secrets
from datetime import datetime, timedelta, timezone

from app.core.config import Settings
from app.models.password_reset_token import PasswordResetToken
from app.repositories.marketing_team_member_repository import (
    MarketingTeamMemberRepository,
)
from app.repositories.password_reset_token_repository import (
    PasswordResetTokenRepository,
)
from app.schemas.auth import ForgotPasswordResponse
from app.services.klaviyo_email_service import KlaviyoEmailService
from app.utils.frontend_context import build_frontend_context

GENERIC_MESSAGE = (
    "If an account exists for this email, password reset instructions have been sent."
)


class ForgotPasswordService:
    """Service for initiating password recovery."""

    def __init__(
        self,
        user_repository: MarketingTeamMemberRepository,
        token_repository: PasswordResetTokenRepository,
        klaviyo_service: KlaviyoEmailService,
        settings: Settings,
    ) -> None:
        """Initialize forgot password service."""
        self.user_repository = user_repository
        self.token_repository = token_repository
        self.klaviyo_service = klaviyo_service
        self.settings = settings

    def initiate_reset(self, email: str) -> ForgotPasswordResponse:
        """Initiate password reset flow without revealing account existence."""
        user = self.user_repository.get_by_email(email)
        if user is not None and user.is_active and user.is_authorized:
            raw_token = secrets.token_urlsafe(32)
            token_hash = hashlib.sha256(raw_token.encode()).hexdigest()
            expires_at = datetime.now(timezone.utc) + timedelta(
                minutes=self.settings.password_reset_token_expire_minutes
            )
            reset_token = PasswordResetToken(
                user_id=user.id,
                token_hash=token_hash,
                expires_at=expires_at,
            )
            self.token_repository.create_token(reset_token)
            self.klaviyo_service.send_password_reset_email(user.email, raw_token)

        return ForgotPasswordResponse(
            success=True,
            message=GENERIC_MESSAGE,
            **build_frontend_context(role="anonymous"),
        )
