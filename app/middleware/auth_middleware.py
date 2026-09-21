"""JWT authentication middleware for protected routes."""

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response

from app.core.security import InvalidTokenError, decode_token
from app.schemas.response import error_response

PUBLIC_PATHS = {
    "/api/v1/health",
    "/docs",
    "/redoc",
    "/openapi.json",
    "/api/v1/marketing-team-member/login",
    "/api/v1/marketing-team-member/forgot-password",
}


class AuthMiddleware(BaseHTTPMiddleware):
    """Validate JWT bearer tokens on non-public API routes."""

    async def dispatch(
        self,
        request: Request,
        call_next: RequestResponseEndpoint,
    ) -> Response:
        """Skip public paths; validate Bearer token on protected paths."""
        path = request.url.path
        if path in PUBLIC_PATHS or not path.startswith("/api/v1"):
            return await call_next(request)

        authorization = request.headers.get("Authorization")
        if not authorization or not authorization.startswith("Bearer "):
            return JSONResponse(
                status_code=401,
                content=error_response(
                    message="Authentication credentials were not provided.",
                    code="UNAUTHORIZED",
                ),
            )

        token = authorization.removeprefix("Bearer ").strip()
        try:
            payload = decode_token(token)
            if payload.get("type") != "access":
                raise InvalidTokenError("Invalid token type.")
            request.state.token_payload = payload
        except InvalidTokenError:
            return JSONResponse(
                status_code=401,
                content=error_response(
                    message="Invalid or expired authentication token.",
                    code="INVALID_TOKEN",
                ),
            )

        return await call_next(request)


def register_auth_middleware(app: FastAPI) -> None:
    """Register JWT authentication middleware on the application."""
    app.add_middleware(AuthMiddleware)
