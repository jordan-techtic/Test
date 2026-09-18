"""FastAPI global exception handlers."""

from typing import Any, List

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from loguru import logger
from slowapi.errors import RateLimitExceeded

from app.exceptions.http_exceptions import AppHTTPException
from app.schemas.response import error_response


def _format_validation_errors(exc: RequestValidationError) -> List[dict[str, str]]:
    """Convert FastAPI validation errors into field-level detail objects."""
    formatted: List[dict[str, str]] = []
    for error in exc.errors():
        location = error.get("loc", ())
        field = ".".join(str(part) for part in location if part != "body")
        formatted.append(
            {
                "field": field or "body",
                "message": error.get("msg", "Invalid value."),
            }
        )
    return formatted


def register_exception_handlers(app: FastAPI) -> None:
    """Register all global exception handlers on the FastAPI application."""

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request,
        exc: RequestValidationError,
    ) -> JSONResponse:
        """Handle Pydantic/FastAPI request validation errors."""
        details = _format_validation_errors(exc)
        return JSONResponse(
            status_code=422,
            content=error_response(
                message="Validation failed.",
                code="VALIDATION_ERROR",
                details=details,
            ),
        )

    @app.exception_handler(AppHTTPException)
    async def app_http_exception_handler(
        request: Request,
        exc: AppHTTPException,
    ) -> JSONResponse:
        """Handle domain-specific HTTP exceptions."""
        return JSONResponse(
            status_code=exc.status_code,
            content=error_response(
                message=exc.message,
                code=exc.code,
                details=exc.details,
            ),
        )

    @app.exception_handler(RateLimitExceeded)
    async def rate_limit_exception_handler(
        request: Request,
        exc: RateLimitExceeded,
    ) -> JSONResponse:
        """Handle rate limit exceeded errors."""
        return JSONResponse(
            status_code=429,
            content=error_response(
                message="Too many requests. Please try again later.",
                code="RATE_LIMIT_EXCEEDED",
                details=None,
            ),
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(
        request: Request,
        exc: Exception,
    ) -> JSONResponse:
        """Handle unexpected server errors without leaking internals."""
        logger.exception("Unhandled exception on {} {}", request.method, request.url.path)
        return JSONResponse(
            status_code=500,
            content=error_response(
                message="An unexpected error occurred. Please try again later.",
                code="INTERNAL_SERVER_ERROR",
                details=None,
            ),
        )
