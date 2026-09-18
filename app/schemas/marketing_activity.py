"""Marketing activity and calendar schemas."""

from datetime import date
from typing import Any, Optional
from uuid import UUID

from pydantic import BaseModel, Field, field_validator

from app.core.constants import ACTIVITY_TYPES


class PerformanceMetrics(BaseModel):
    """Klaviyo performance metrics for an activity."""

    revenue: Optional[float] = Field(default=None, description="Campaign revenue.")
    open_rate: Optional[float] = Field(default=None, description="Email open rate.")
    click_rate: Optional[float] = Field(default=None, description="Email click rate.")
    delivered_orders: Optional[int] = Field(default=None, description="Delivered orders.")


class ActivityCreate(BaseModel):
    """Create marketing activity request."""

    title: str = Field(..., min_length=1, max_length=100, examples=["Spring Promo"])
    date: date = Field(..., description="Scheduled activity date (today or future).")
    type: str = Field(..., description="Predefined activity type.", examples=["email_send"])
    description: Optional[str] = Field(default=None, max_length=500)
    status: str = Field(default="active", pattern="^(active|inactive)$")
    dynamic_fields: Optional[dict[str, Any]] = Field(
        default=None,
        description="Optional type-specific fields.",
    )

    @field_validator("type")
    @classmethod
    def validate_type(cls, value: str) -> str:
        """Ensure activity type is predefined."""
        if value not in ACTIVITY_TYPES:
            raise ValueError("Invalid activity type.")
        return value


class ActivityUpdate(BaseModel):
    """Update marketing activity request."""

    title: Optional[str] = Field(default=None, min_length=1, max_length=100)
    date: Optional[date] = None
    type: Optional[str] = None
    description: Optional[str] = Field(default=None, max_length=500)
    status: Optional[str] = Field(default=None, pattern="^(active|inactive)$")
    version: int = Field(..., description="Expected version for optimistic locking.")
    dynamic_fields: Optional[dict[str, Any]] = None

    @field_validator("type")
    @classmethod
    def validate_type(cls, value: Optional[str]) -> Optional[str]:
        """Ensure activity type is predefined when provided."""
        if value is not None and value not in ACTIVITY_TYPES:
            raise ValueError("Invalid activity type.")
        return value


class ActivityResponse(BaseModel):
    """Marketing activity response payload."""

    id: UUID
    title: str
    date: date
    type: str
    description: Optional[str] = None
    status: str
    campaign_code: str
    category: str
    color: str
    performance: Optional[PerformanceMetrics] = None

    model_config = {"from_attributes": True}


class ActivityListResponse(BaseModel):
    """Activity mutation or retrieval success envelope."""

    success: bool = True
    message: str
    data: ActivityResponse


class CalendarResponse(BaseModel):
    """Annual calendar success envelope."""

    success: bool = True
    message: str = "Calendar retrieved successfully."
    data: dict
