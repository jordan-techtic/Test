"""Shared pytest fixtures."""

import os

import pytest
from fastapi.testclient import TestClient

# Ensure required settings exist before application modules import Settings.
os.environ.setdefault(
    "DATABASE_URL",
    "postgresql://postgres:1234@127.0.0.1:5432/marketing_cal",
)
os.environ.setdefault("JWT_SECRET", "test-jwt-secret-key-for-pytest")
os.environ.setdefault("JWT_ALGORITHM", "HS256")
os.environ.setdefault("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
os.environ.setdefault("REFRESH_TOKEN_EXPIRE_DAYS", "7")
os.environ.setdefault("AUTH_STRATEGY", "jwt")
os.environ.setdefault("KLAVIYO_API_KEY", "test-klaviyo-key")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000")
os.environ.setdefault("LOG_LEVEL", "ERROR")

from app.core.config import get_settings  # noqa: E402
from app.main import create_app  # noqa: E402


@pytest.fixture(scope="session", autouse=True)
def clear_settings_cache() -> None:
    """Clear settings cache so tests use environment defaults."""
    get_settings.cache_clear()


@pytest.fixture
def client() -> TestClient:
    """Return a FastAPI test client."""
    application = create_app()
    return TestClient(application)
