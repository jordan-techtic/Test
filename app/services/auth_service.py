"""Authentication business logic."""

from app.core.config import get_settings
from app.core.security import create_access_token, create_refresh_token
from app.exceptions.http_exceptions import ForbiddenError, UnauthorizedError
from app.utils.frontend_context import build_frontend_context
from app.repositories.marketing_team_member_repository import (
    MarketingTeamMemberRepository,
)
from app.schemas.auth import LoginResponse, TokenData
from app.services.password_service import verify_password


class AuthService:
    """Service for marketing team member authentication."""

    def __init__(self, repository: MarketingTeamMemberRepository) -> None:
        """Initialize auth service."""
        self.repository = repository

    def login(self, email_or_username: str, password: str) -> LoginResponse:
        """Authenticate user and return JWT token pair."""
        user = self.repository.get_by_email_or_username(email_or_username)
        if user is None or not verify_password(password, user.hashed_password):
            raise UnauthorizedError(
                message="Invalid email/username or password.",
                code="INVALID_CREDENTIALS",
            )
        if not user.is_active:
            raise ForbiddenError(
                message="Your account is inactive. Contact an administrator.",
                code="ACCOUNT_INACTIVE",
            )
        if not user.is_authorized:
            raise ForbiddenError(
                message="You are not authorized to access this application.",
                code="NOT_AUTHORIZED",
            )
        subject = str(user.id)
        settings = get_settings()
        return LoginResponse(
            success=True,
            message="Login successful.",
            data=TokenData(
                access_token=create_access_token(subject),
                refresh_token=create_refresh_token(subject),
                token_type="bearer",
                expires_in=settings.access_token_expire_minutes * 60,
            ),
            **build_frontend_context(user),
        )
