"""Unit tests for password hashing and validation."""

from app.services.password_service import (
    hash_password,
    validate_password_strength,
    verify_password,
)


def test_hash_and_verify_password() -> None:
    """Hashed password verifies successfully against the original."""
    plain = "TestUser123!"
    hashed = hash_password(plain)
    assert verify_password(plain, hashed) is True
    assert verify_password("WrongPass1!", hashed) is False


def test_validate_password_strength_accepts_valid() -> None:
    """Password meeting complexity rules passes validation."""
    assert validate_password_strength("TestUser123!") is True


def test_validate_password_strength_rejects_weak() -> None:
    """Password missing complexity requirements fails validation."""
    assert validate_password_strength("short") is False
    assert validate_password_strength("alllowercase1!") is False
