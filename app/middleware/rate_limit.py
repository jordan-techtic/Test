"""SlowAPI rate limiting configuration."""

from fastapi import FastAPI
from slowapi import Limiter
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from app.core.config import get_settings

settings = get_settings()

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=[settings.rate_limit_default],
)


def register_rate_limiting(app: FastAPI) -> None:
    """Attach rate limiter state and enforce limits via SlowAPIMiddleware."""
    app.state.limiter = limiter
    app.add_middleware(SlowAPIMiddleware)
