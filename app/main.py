"""FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.logging import setup_logging
from app.exceptions.handlers import register_exception_handlers
from app.middleware.auth_middleware import register_auth_middleware
from app.middleware.cors_middleware import configure_cors
from app.middleware.logging_middleware import register_logging_middleware
from app.middleware.rate_limit import register_rate_limiting


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    settings = get_settings()
    setup_logging()

    application = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        debug=settings.debug,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        description=(
            "Marketing Content Calendar API for marketing team members. "
            "Authenticate via POST /api/v1/marketing-team-member/login to obtain a JWT, "
            "then pass `Authorization: Bearer <access_token>` on protected routes."
        ),
    )

    configure_cors(application)
    register_logging_middleware(application)
    register_auth_middleware(application)
    register_rate_limiting(application)
    register_exception_handlers(application)

    application.include_router(api_router, prefix="/api/v1")

    def custom_openapi() -> dict:
        """Generate OpenAPI schema with JWT bearer security scheme."""
        if application.openapi_schema:
            return application.openapi_schema
        schema = get_openapi(
            title=application.title,
            version=application.version,
            description=application.description,
            routes=application.routes,
        )
        schema.setdefault("components", {}).setdefault("securitySchemes", {})
        schema["components"]["securitySchemes"]["BearerAuth"] = {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": (
                "JWT access token from POST /api/v1/marketing-team-member/login. "
                "Example: Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
            ),
        }
        application.openapi_schema = schema
        return application.openapi_schema

    application.openapi = custom_openapi

    return application


app = create_app()
