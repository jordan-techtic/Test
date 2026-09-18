"""Marketing team member calendar and activity endpoints."""

from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query, status

from app.dependencies.auth import get_current_user
from app.dependencies.services import get_marketing_activity_service
from app.models.marketing_team_member import MarketingTeamMember
from app.schemas.marketing_activity import (
    ActivityCreate,
    ActivityListResponse,
    ActivityUpdate,
    CalendarResponse,
)
from app.services.marketing_activity_service import MarketingActivityService

router = APIRouter(
    prefix="/marketing-team-member",
    tags=["marketing-team-member-calendar"],
)


@router.get(
    "/calendar",
    response_model=CalendarResponse,
    status_code=status.HTTP_200_OK,
    summary="Get annual marketing calendar",
    description="Retrieve scheduled marketing activities for a year with optional filters.",
    responses={
        401: {"description": "Unauthorized."},
        403: {"description": "Forbidden."},
    },
)
async def get_calendar(
    year: int = Query(..., ge=2000, le=2100, description="Calendar year."),
    month: Optional[int] = Query(default=None, ge=1, le=12, description="Optional month filter."),
    category: Optional[str] = Query(default=None, description="Filter by category."),
    activity_type: Optional[str] = Query(
        default=None, alias="type", description="Filter by activity type."
    ),
    include_performance: bool = Query(
        default=False,
        description="Include Klaviyo performance metrics when permitted.",
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
    summary="Create marketing activity",
    responses={
        401: {"description": "Unauthorized."},
        409: {"description": "Conflict."},
        422: {"description": "Validation error."},
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
    summary="Get marketing activity",
    responses={
        401: {"description": "Unauthorized."},
        404: {"description": "Not found."},
    },
)
async def get_activity(
    activity_id: UUID,
    include_performance: bool = Query(default=False),
    current_user: MarketingTeamMember = Depends(get_current_user),
    activity_service: MarketingActivityService = Depends(get_marketing_activity_service),
) -> ActivityListResponse:
    """Retrieve marketing activity details."""
    return activity_service.get_activity(activity_id, current_user, include_performance)


@router.put(
    "/activities/{activity_id}",
    response_model=ActivityListResponse,
    summary="Update marketing activity",
    responses={
        401: {"description": "Unauthorized."},
        404: {"description": "Not found."},
        409: {"description": "Conflict."},
    },
)
async def update_activity(
    activity_id: UUID,
    body: ActivityUpdate,
    current_user: MarketingTeamMember = Depends(get_current_user),
    activity_service: MarketingActivityService = Depends(get_marketing_activity_service),
) -> ActivityListResponse:
    """Update an existing marketing activity."""
    return activity_service.update_activity(activity_id, current_user, body)


@router.delete(
    "/activities/{activity_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete marketing activity",
    responses={
        401: {"description": "Unauthorized."},
        404: {"description": "Not found."},
    },
)
async def delete_activity(
    activity_id: UUID,
    current_user: MarketingTeamMember = Depends(get_current_user),
    activity_service: MarketingActivityService = Depends(get_marketing_activity_service),
) -> dict:
    """Delete a marketing activity."""
    return activity_service.delete_activity(activity_id)
