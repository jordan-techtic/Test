"""Health check endpoint."""

from fastapi import APIRouter, status

from app.schemas.health import HealthData, HealthResponse
from app.utils.frontend_context import build_frontend_context

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="Health check",
    description=(
        "Returns the current health status of the API. "
        "Use this endpoint for load balancer and container liveness probes."
    ),
    responses={
        200: {
            "description": "Service is healthy.",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Service is healthy.",
                        "role": "system",
                        "organization": "Marketing",
                        "data": {"status": "OK"},
                    }
                }
            },
        },
        500: {
            "description": "Unexpected server error.",
            "content": {
                "application/json": {
                    "example": {
                        "success": False,
                        "message": "An unexpected error occurred. Please try again later.",
                        "error": {
                            "code": "INTERNAL_SERVER_ERROR",
                            "details": None,
                        },
                    }
                }
            },
        },
    },
    tags=["health"],
)
async def health_check() -> HealthResponse:
    """Return service health status."""
    return HealthResponse(
        success=True,
        message="Service is healthy.",
        data=HealthData(status="OK"),
        **build_frontend_context(role="system"),
    )
