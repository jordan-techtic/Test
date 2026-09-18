"""Health check response schemas."""

from pydantic import BaseModel, Field


class HealthData(BaseModel):
    """Health check payload."""

    status: str = Field(
        ...,
        description="Service health status.",
        examples=["OK"],
    )


class HealthResponse(BaseModel):
    """Health check success response envelope."""

    success: bool = Field(default=True, description="Always true for a healthy service.")
    message: str = Field(
        default="Service is healthy.",
        description="Human-readable health message.",
    )
    data: HealthData = Field(..., description="Health status payload.")
