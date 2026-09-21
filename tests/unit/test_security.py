"""Unit tests for JWT security utilities."""

import pytest

from app.core.security import (
    InvalidTokenError,
    create_access_token,
    create_refresh_token,
    decode_token,
)


def test_create_access_token_returns_jwt_string() -> None:
    """Access token creation returns a non-empty JWT string."""
    token = create_access_token(subject="user-123")
    assert isinstance(token, str)
    assert len(token) > 0


def test_create_refresh_token_has_type_refresh() -> None:
    """Refresh token payload includes type=refresh."""
    token = create_refresh_token(subject="user-123")
    payload = decode_token(token)
    assert payload["sub"] == "user-123"
    assert payload["type"] == "refresh"


def test_decode_token_invalid_signature_raises() -> None:
    """Decoding a tampered token raises InvalidTokenError."""
    token = create_access_token(subject="user-123")
    tampered = token[:-4] + "xxxx"
    with pytest.raises(InvalidTokenError):
        decode_token(tampered)


def test_access_token_has_type_access() -> None:
    """Access token payload includes type=access."""
    token = create_access_token(subject="user-456")
    payload = decode_token(token)
    assert payload["type"] == "access"
