"""Authentication dependencies for JWT-protected routes."""

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from app.core.security import InvalidTokenError, decode_token
from app.exceptions.http_exceptions import UnauthorizedError

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/marketing-team-member/login",
    auto_error=False,
)


async def get_current_user_token(
    token: str | None = Depends(oauth2_scheme),
) -> dict:
    """
    Validate the bearer access token and return its decoded payload.

    This is a skeleton dependency for future authenticated routes.
    """
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
    return payload
