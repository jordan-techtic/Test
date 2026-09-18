"""Standard API response envelope schemas."""

from typing import Any, Generic, TypeVar

from pydantic import BaseModel, ConfigDict, Field

from app.core.config import get_settings
from app.schemas.frontend_context import FrontendContextFields

T = TypeVar("T")


class ErrorDetail(BaseModel):
    """Machine-readable error payload."""

    code: str = Field(..., description="Stable machine-readable error code.")
    details: Any | None = Field(
        default=None,
        description="Optional structured details such as field-level validation errors.",
    )


class ErrorResponse(FrontendContextFields):
    """Standard error response envelope."""

    success: bool = Field(default=False, description="Always false for error responses.")
    message: str = Field(..., description="UI-safe human-readable error message.")
    error: ErrorDetail = Field(..., description="Machine-readable error information.")


class SuccessResponse(BaseModel, Generic[T]):
    """Standard success response envelope."""

    model_config = ConfigDict(from_attributes=True)

    success: bool = Field(default=True, description="Always true for success responses.")
    message: str = Field(..., description="Human-readable success message.")
    data: T = Field(..., description="Response payload.")


def success_response(
    message: str,
    data: Any,
) -> dict[str, Any]:
    """Build a standard success response dictionary."""
    return {
        "success": True,
        "message": message,
        "data": data,
    }


def error_response(
    message: str,
    code: str,
    details: Any | None = None,
    role: str = "anonymous",
) -> dict[str, Any]:
    """Build a standard error response dictionary."""
    settings = get_settings()
    return {
        "success": False,
        "message": message,
        "role": role,
        "organization": settings.organization,
        "error": {
            "code": code,
            "details": details,
        },
    }
