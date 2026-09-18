"""HTTP request/response logging middleware."""

import time

from fastapi import FastAPI, Request, Response
from loguru import logger


def register_logging_middleware(app: FastAPI) -> None:
    """Register middleware that logs request method, path, status, and duration."""

    @app.middleware("http")
    async def log_requests(request: Request, call_next) -> Response:
        """Log each HTTP request and its response status."""
        start = time.perf_counter()
        response = await call_next(request)
        duration_ms = (time.perf_counter() - start) * 1000
        logger.info(
            "Request: {} {} - Response: {} - Duration: {:.2f}ms",
            request.method,
            request.url.path,
            response.status_code,
            duration_ms,
        )
        return response
