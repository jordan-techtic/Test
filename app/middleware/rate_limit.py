"""SlowAPI rate limiting configuration."""

from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.config import get_settings

settings = get_settings()

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=[settings.rate_limit_default],
)


def register_rate_limiting(app) -> None:
    """Attach rate limiter state to the FastAPI app."""
    app.state.limiter = limiter
