"""Service dependency providers."""

from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.config import Settings, get_settings
from app.dependencies.database import get_db
from app.repositories.marketing_team_member_repository import (
    MarketingTeamMemberRepository,
)
from app.repositories.password_reset_token_repository import (
    PasswordResetTokenRepository,
)
from app.services.auth_service import AuthService
from app.services.forgot_password_service import ForgotPasswordService
from app.services.klaviyo_email_service import KlaviyoEmailService


def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    """Provide AuthService instance."""
    return AuthService(MarketingTeamMemberRepository(db))


def get_forgot_password_service(
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> ForgotPasswordService:
    """Provide ForgotPasswordService instance."""
    return ForgotPasswordService(
        user_repository=MarketingTeamMemberRepository(db),
        token_repository=PasswordResetTokenRepository(db),
        klaviyo_service=KlaviyoEmailService(settings),
        settings=settings,
    )
