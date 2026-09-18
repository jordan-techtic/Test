"""Marketing activity and calendar schemas."""

from datetime import date as date_type
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.core.constants import (
    ACTIVITY_TYPES,
)
from app.schemas.frontend_context import FrontendContextFields


class PerformanceMetrics(BaseModel):
    """Klaviyo performance metrics for an activity."""

    revenue: float | None = Field(default=None, description="Campaign revenue in USD.", examples=[1250.50])
    open_rate: float | None = Field(default=None, description="Email open rate (0-1).", examples=[0.42])
    click_rate: float | None = Field(default=None, description="Email click rate (0-1).", examples=[0.18])
    delivered_orders: int | None = Field(default=None, description="Number of delivered orders.", examples=[37])


class ActivityCreate(BaseModel):
    """Create marketing activity request."""

    title: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Display title shown on the calendar.",
        examples=["Spring Promo"],
    )
    date: date_type = Field(
        ...,
        description="Scheduled activity date. Must be today or a future date (YYYY-MM-DD).",
        examples=["2026-04-15"],
    )
    type: str = Field(
        ...,
        description=(
            "Predefined activity type. Allowed: "
            + ", ".join(sorted(ACTIVITY_TYPES.keys()))
            + "."
        ),
        examples=["email_send"],
    )
    description: str | None = Field(
        default=None,
        max_length=500,
        description="Optional long-form description (max 500 characters).",
        examples=["Q2 spring promotion email campaign."],
    )
    status: str = Field(
        default="active",
        pattern="^(active|inactive)$",
        description="Activity visibility status.",
        examples=["active"],
    )
    dynamic_fields: dict[str, Any] | None = Field(
        default=None,
        description=(
            "Type-specific required fields. "
            "email_send: subject_line; sms_send: message_preview; "
            "content_publish: channel; focus_campaign: focus_area."
        ),
        examples=[{"subject_line": "Spring sale — 20% off everything"}],
    )

    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "title": "Spring Promo",
                    "date": "2026-04-15",
                    "type": "email_send",
                    "description": "Q2 promotion",
                    "status": "active",
                    "dynamic_fields": {"subject_line": "Spring sale launch"},
                }
            ]
        }
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

    title: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
        description="Updated display title.",
        examples=["Updated Spring Promo"],
    )
    date: date_type | None = Field(
        default=None,
        description="Updated scheduled date (today or future).",
        examples=["2026-04-20"],
    )
    type: str | None = Field(
        default=None,
        description="Updated activity type (must be a predefined type).",
        examples=["email_send"],
    )
    description: str | None = Field(
        default=None,
        max_length=500,
        description="Updated description.",
    )
    status: str | None = Field(
        default=None,
        pattern="^(active|inactive)$",
        description="Updated status.",
        examples=["active"],
    )
    version: int = Field(
        ...,
        description="Expected version from the last GET response; used for optimistic locking.",
        examples=[1],
    )
    dynamic_fields: dict[str, Any] | None = Field(
        default=None,
        description="Updated type-specific fields (validated when provided).",
        examples=[{"subject_line": "Updated subject"}],
    )

    @field_validator("type")
    @classmethod
    def validate_type(cls, value: str | None) -> str | None:
        """Ensure activity type is predefined when provided."""
        if value is not None and value not in ACTIVITY_TYPES:
            raise ValueError("Invalid activity type.")
        return value


class ActivityResponse(BaseModel):
    """Marketing activity response payload."""

    id: UUID = Field(..., description="Unique activity identifier.")
    title: str = Field(..., description="Activity title.")
    date: date_type = Field(..., description="Scheduled date.")
    type: str = Field(..., description="Activity type key.")
    description: str | None = Field(default=None, description="Optional description.")
    status: str = Field(..., description="active or inactive.")
    campaign_code: str = Field(..., description="Generated campaign code (C{C}-MO{M}-Y{YY}-{TYPE}).")
    category: str = Field(..., description="Activity category: promotions, content, or focuses.")
    color: str = Field(..., description="Hex color for calendar display.", examples=["#4F46E5"])
    dynamic_fields: dict[str, Any] | None = Field(
        default=None,
        description="Type-specific field values persisted for this activity.",
    )
    version: int = Field(..., description="Optimistic-locking version; required for PUT.")
    performance: PerformanceMetrics | None = Field(
        default=None,
        description="Klaviyo metrics when include_performance=true and user has access.",
    )

    model_config = ConfigDict(from_attributes=True)


class ActivityListResponse(FrontendContextFields):
    """Activity mutation or retrieval success envelope."""

    success: bool = Field(default=True, description="Always true on success.")
    message: str = Field(..., description="Human-readable result message.")
    data: ActivityResponse = Field(..., description="Activity payload.")


class CalendarActivityData(BaseModel):
    """Single calendar year payload."""

    year: int = Field(..., description="Calendar year requested.", examples=[2026])
    month: int | None = Field(
        default=None,
        description="Optional month filter (1-12) when provided in query.",
        examples=[4],
    )
    activities: list[ActivityResponse] = Field(
        ...,
        description="Activities ordered by date ascending.",
    )


class CalendarResponse(FrontendContextFields):
    """Annual calendar success envelope."""

    success: bool = Field(default=True, description="Always true on success.")
    message: str = Field(default="Calendar retrieved successfully.")
    data: CalendarActivityData = Field(..., description="Calendar year data.")


class DeleteActivityResponse(FrontendContextFields):
    """Delete activity success envelope."""

    success: bool = Field(default=True)
    message: str = Field(..., examples=["Activity deleted successfully."])
    data: None = Field(default=None, description="Always null after delete.")
