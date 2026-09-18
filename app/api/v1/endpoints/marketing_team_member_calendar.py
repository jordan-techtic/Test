"""Marketing team member calendar and activity endpoints."""

from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Path, Query, status

from app.core.constants import ACTIVITY_CATEGORIES, ACTIVITY_TYPES
from app.dependencies.auth import get_current_user, oauth2_scheme
from app.dependencies.services import get_marketing_activity_service
from app.models.marketing_team_member import MarketingTeamMember
from app.schemas.marketing_activity import (
    ActivityCreate,
    ActivityListResponse,
    ActivityUpdate,
    CalendarResponse,
    DeleteActivityResponse,
)
from app.schemas.openapi import (
    CONFLICT_RESPONSE,
    NOT_FOUND_RESPONSE,
    PROTECTED_ERROR_RESPONSES,
)
from app.services.marketing_activity_service import MarketingActivityService

router = APIRouter(
    prefix="/marketing-team-member",
    tags=["marketing-team-member-calendar"],
    dependencies=[Depends(oauth2_scheme)],
)

_ACTIVITY_TYPE_DESC = "Filter by activity type. Allowed: " + ", ".join(ACTIVITY_TYPES.keys()) + "."
_CATEGORY_DESC = "Filter by category. Allowed: " + ", ".join(ACTIVITY_CATEGORIES) + "."


@router.get(
    "/calendar",
    response_model=CalendarResponse,
    status_code=status.HTTP_200_OK,
    operation_id="getMarketingCalendar",
    summary="Get annual marketing calendar",
    description=(
        "Retrieve marketing activities for a calendar year with optional month, category, "
        "and type filters. Activities include display color and dynamic fields for FE rendering. "
        "Set include_performance=true to attach Klaviyo metrics when the authenticated user "
        "has has_performance_access."
    ),
    responses={
        200: {
            "description": "Calendar retrieved successfully.",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Calendar retrieved successfully.",
                        "data": {
                            "year": 2026,
                            "month": None,
                            "activities": [
                                {
                                    "id": "550e8400-e29b-41d4-a716-446655440000",
                                    "title": "Spring Promo",
                                    "date": "2026-04-15",
                                    "type": "email_send",
                                    "status": "active",
                                    "campaign_code": "C6-MO4-Y26-EMA",
                                    "category": "promotions",
                                    "color": "#4F46E5",
                                    "dynamic_fields": {"subject_line": "Spring sale"},
                                    "version": 1,
                                    "performance": None,
                                }
                            ],
                        },
                    }
                }
            },
        },
        **{k: v for k, v in PROTECTED_ERROR_RESPONSES.items() if k in (401, 403, 500)},
    },
)
async def get_calendar(
    year: int = Query(..., ge=2000, le=2100, description="Calendar year.", examples=[2026]),
    month: Optional[int] = Query(
        default=None,
        ge=1,
        le=12,
        description="Optional month filter (1-12) for month navigation.",
        examples=[4],
    ),
    category: Optional[str] = Query(
        default=None,
        description=_CATEGORY_DESC,
        examples=["promotions"],
    ),
    activity_type: Optional[str] = Query(
        default=None,
        alias="type",
        description=_ACTIVITY_TYPE_DESC,
        examples=["email_send"],
    ),
    include_performance: bool = Query(
        default=False,
        description="Include Klaviyo performance metrics when user has permission.",
        examples=[False],
    ),
    current_user: MarketingTeamMember = Depends(get_current_user),
    activity_service: MarketingActivityService = Depends(get_marketing_activity_service),
) -> CalendarResponse:
    """Return annual calendar view."""
    return activity_service.list_calendar(
        user=current_user,
        year=year,
        month=month,
        category=category,
        activity_type=activity_type,
        include_performance=include_performance,
    )


@router.post(
    "/activities",
    response_model=ActivityListResponse,
    status_code=status.HTTP_201_CREATED,
    operation_id="createMarketingActivity",
    summary="Create marketing activity",
    description=(
        "Create a new marketing activity on the calendar. Validates required dynamic fields "
        "by type, enforces unique (date, type) pairs, and generates a campaign code. "
        "Date must be today or in the future."
    ),
    responses={
        201: {
            "description": "Activity created successfully.",
        },
        401: PROTECTED_ERROR_RESPONSES[401],
        409: CONFLICT_RESPONSE,
        422: PROTECTED_ERROR_RESPONSES[422],
        500: PROTECTED_ERROR_RESPONSES[500],
    },
)
async def create_activity(
    body: ActivityCreate,
    current_user: MarketingTeamMember = Depends(get_current_user),
    activity_service: MarketingActivityService = Depends(get_marketing_activity_service),
) -> ActivityListResponse:
    """Create a new marketing activity."""
    return activity_service.create_activity(current_user, body)


@router.get(
    "/activities/{activity_id}",
    response_model=ActivityListResponse,
    operation_id="getMarketingActivity",
    summary="Get marketing activity",
    description="Retrieve a single marketing activity by UUID, optionally with Klaviyo performance.",
    responses={
        401: PROTECTED_ERROR_RESPONSES[401],
        403: PROTECTED_ERROR_RESPONSES[403],
        404: NOT_FOUND_RESPONSE,
        500: PROTECTED_ERROR_RESPONSES[500],
    },
)
async def get_activity(
    activity_id: UUID = Path(..., description="Marketing activity UUID.", examples=["550e8400-e29b-41d4-a716-446655440000"]),
    include_performance: bool = Query(
        default=False,
        description="Include Klaviyo metrics when user has performance access.",
        examples=[False],
    ),
    current_user: MarketingTeamMember = Depends(get_current_user),
    activity_service: MarketingActivityService = Depends(get_marketing_activity_service),
) -> ActivityListResponse:
    """Retrieve marketing activity details."""
    return activity_service.get_activity(activity_id, current_user, include_performance)


@router.put(
    "/activities/{activity_id}",
    response_model=ActivityListResponse,
    operation_id="updateMarketingActivity",
    summary="Update marketing activity",
    description=(
        "Update an existing activity. Requires version from the latest GET for optimistic "
        "locking. Returns 409 VERSION_CONFLICT when version is stale or date/type conflicts."
    ),
    responses={
        401: PROTECTED_ERROR_RESPONSES[401],
        403: PROTECTED_ERROR_RESPONSES[403],
        404: NOT_FOUND_RESPONSE,
        409: CONFLICT_RESPONSE,
        422: PROTECTED_ERROR_RESPONSES[422],
        500: PROTECTED_ERROR_RESPONSES[500],
    },
)
async def update_activity(
    body: ActivityUpdate,
    activity_id: UUID,
    current_user: MarketingTeamMember = Depends(get_current_user),
    activity_service: MarketingActivityService = Depends(get_marketing_activity_service),
) -> ActivityListResponse:
    """Update an existing marketing activity."""
    return activity_service.update_activity(activity_id, current_user, body)


@router.delete(
    "/activities/{activity_id}",
    response_model=DeleteActivityResponse,
    status_code=status.HTTP_200_OK,
    operation_id="deleteMarketingActivity",
    summary="Delete marketing activity",
    description="Permanently delete a marketing activity by UUID.",
    responses={
        200: {
            "description": "Activity deleted successfully.",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Activity deleted successfully.",
                        "data": None,
                    }
                }
            },
        },
        401: PROTECTED_ERROR_RESPONSES[401],
        403: PROTECTED_ERROR_RESPONSES[403],
        404: NOT_FOUND_RESPONSE,
        500: PROTECTED_ERROR_RESPONSES[500],
    },
)
async def delete_activity(
    activity_id: UUID = Path(..., description="Marketing activity UUID."),
    current_user: MarketingTeamMember = Depends(get_current_user),
    activity_service: MarketingActivityService = Depends(get_marketing_activity_service),
) -> DeleteActivityResponse:
    """Delete a marketing activity."""
    result = activity_service.delete_activity(activity_id)
    return DeleteActivityResponse(**result)
