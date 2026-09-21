"""JWT token creation and validation utilities."""

from datetime import UTC, datetime, timedelta
from typing import Any

from jose import JWTError, jwt

from app.core.config import get_settings


class InvalidTokenError(Exception):
    """Raised when a JWT token is invalid or expired."""


def create_access_token(
    subject: str,
    extra: dict[str, Any] | None = None,
    expires_delta: timedelta | None = None,
) -> str:
    """Create a signed JWT access token for the given subject."""
    settings = get_settings()
    expire = datetime.now(UTC) + (
        expires_delta
        if expires_delta is not None
        else timedelta(minutes=settings.access_token_expire_minutes)
    )
    payload: dict[str, Any] = {
        "sub": subject,
        "type": "access",
        "exp": expire,
    }
    if extra:
        payload.update(extra)
    return jwt.encode(
        payload,
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm,
    )


def create_refresh_token(
    subject: str,
    expires_delta: timedelta | None = None,
) -> str:
    """Create a signed JWT refresh token for the given subject."""
    settings = get_settings()
    expire = datetime.now(UTC) + (
        expires_delta
        if expires_delta is not None
        else timedelta(days=settings.refresh_token_expire_days)
    )
    payload: dict[str, Any] = {
        "sub": subject,
        "type": "refresh",
        "exp": expire,
    }
    return jwt.encode(
        payload,
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm,
    )


def decode_token(token: str) -> dict[str, Any]:
    """Decode and validate a JWT token, returning its payload."""
    settings = get_settings()
    try:
        return jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm],
        )
    except JWTError as exc:
        raise InvalidTokenError("Invalid or expired token.") from exc
