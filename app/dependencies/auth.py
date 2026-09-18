"""Authentication dependencies for JWT-protected routes."""

from uuid import UUID

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.security import InvalidTokenError, decode_token
from app.dependencies.database import get_db
from app.exceptions.http_exceptions import ForbiddenError, UnauthorizedError
from app.models.marketing_team_member import MarketingTeamMember
from app.repositories.marketing_team_member_repository import (
    MarketingTeamMemberRepository,
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/marketing-team-member/login",
    auto_error=False,
)


async def get_current_user(
    token: str | None = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> MarketingTeamMember:
    """Validate JWT and return the authenticated marketing team member."""
    if token is None:
        raise UnauthorizedError(
            message="Authentication credentials were not provided.",
            code="UNAUTHORIZED",
        )
    try:
        payload = decode_token(token)
    except InvalidTokenError as exc:
        raise UnauthorizedError(
            message="Invalid or expired authentication token.",
            code="INVALID_TOKEN",
        ) from exc
    if payload.get("type") != "access":
        raise UnauthorizedError(
            message="Invalid token type.",
            code="INVALID_TOKEN_TYPE",
        )

    user_id = payload.get("sub")
    if not user_id:
        raise UnauthorizedError(message="Invalid token subject.", code="INVALID_TOKEN")

    user = MarketingTeamMemberRepository(db).get_by_id(UUID(str(user_id)))
    if user is None:
        raise UnauthorizedError(message="User not found.", code="USER_NOT_FOUND")
    if not user.is_active:
        raise ForbiddenError(
            message="Your account is inactive.",
            code="ACCOUNT_INACTIVE",
        )
    if not user.is_authorized:
        raise ForbiddenError(
            message="You are not authorized to access this application.",
            code="NOT_AUTHORIZED",
        )
    return user
