"""Marketing activity business logic."""

from uuid import UUID

from app.core.constants import ACTIVITY_TYPES
from app.exceptions.http_exceptions import ConflictError, NotFoundError
from app.models.marketing_activity import MarketingActivity
from app.models.marketing_team_member import MarketingTeamMember
from app.repositories.marketing_activity_repository import MarketingActivityRepository
from app.schemas.marketing_activity import (
    ActivityCreate,
    ActivityListResponse,
    ActivityResponse,
    ActivityUpdate,
    CalendarResponse,
    PerformanceMetrics,
)
from app.services.activity_validation_service import ActivityValidationService
from app.services.campaign_code_service import CampaignCodeService
from app.services.klaviyo_performance_service import KlaviyoPerformanceService


class MarketingActivityService:
    """Orchestrate marketing activity CRUD and calendar queries."""

    def __init__(
        self,
        repository: MarketingActivityRepository,
        validation_service: ActivityValidationService,
        campaign_code_service: CampaignCodeService,
        klaviyo_service: KlaviyoPerformanceService,
    ) -> None:
        """Initialize marketing activity service."""
        self.repository = repository
        self.validation_service = validation_service
        self.campaign_code_service = campaign_code_service
        self.klaviyo_service = klaviyo_service

    def _to_response(
        self,
        activity: MarketingActivity,
        include_performance: bool,
        user: MarketingTeamMember,
    ) -> ActivityResponse:
        """Map ORM activity to response schema."""
        performance: PerformanceMetrics | None = None
        if include_performance and user.has_performance_access:
            performance = self.klaviyo_service.get_metrics_by_campaign_code(
                activity.campaign_code
            )
        meta = ACTIVITY_TYPES[activity.activity_type]
        return ActivityResponse(
            id=activity.id,
            title=activity.title,
            date=activity.activity_date,
            type=activity.activity_type,
            description=activity.description,
            status=activity.status,
            campaign_code=activity.campaign_code,
            category=activity.category,
            color=meta["color"],
            dynamic_fields=activity.dynamic_fields or {},
            version=activity.version,
            performance=performance,
        )

    def create_activity(
        self,
        user: MarketingTeamMember,
        payload: ActivityCreate,
    ) -> ActivityListResponse:
        """Create a new marketing activity."""
        self.validation_service.validate_title(payload.title)
        self.validation_service.validate_description(payload.description)
        self.validation_service.validate_date(payload.date)
        category = self.validation_service.validate_activity_type(payload.type)
        self.validation_service.validate_dynamic_fields(payload.type, payload.dynamic_fields)

        if self.repository.exists_date_type(payload.date, payload.type):
            raise ConflictError(
                message="An activity of this type already exists on the selected date.",
                code="ACTIVITY_TYPE_DATE_CONFLICT",
            )

        campaign_code = self.campaign_code_service.generate(payload.type, payload.date)
        activity = MarketingActivity(
            title=payload.title,
            activity_date=payload.date,
            activity_type=payload.type,
            category=category,
            description=payload.description,
            status=payload.status,
            campaign_code=campaign_code,
            dynamic_fields=payload.dynamic_fields or {},
            created_by=user.id,
        )
        saved = self.repository.create(activity)
        return ActivityListResponse(
            success=True,
            message="Activity created successfully.",
            data=self._to_response(saved, False, user),
        )

    def get_activity(
        self,
        activity_id: UUID,
        user: MarketingTeamMember,
        include_performance: bool = False,
    ) -> ActivityListResponse:
        """Retrieve activity by ID."""
        activity = self.repository.get_by_id(activity_id)
        if activity is None:
            raise NotFoundError(
                message="Marketing activity not found.",
                code="ACTIVITY_NOT_FOUND",
            )
        return ActivityListResponse(
            success=True,
            message="Activity retrieved successfully.",
            data=self._to_response(activity, include_performance, user),
        )

    def update_activity(
        self,
        activity_id: UUID,
        user: MarketingTeamMember,
        payload: ActivityUpdate,
    ) -> ActivityListResponse:
        """Update an existing marketing activity."""
        activity = self.repository.get_by_id(activity_id)
        if activity is None:
            raise NotFoundError(
                message="Marketing activity not found.",
                code="ACTIVITY_NOT_FOUND",
            )
        if activity.version != payload.version:
            raise ConflictError(
                message="Activity was modified by another user. Refresh and retry.",
                code="VERSION_CONFLICT",
            )

        new_date = payload.date or activity.activity_date
        new_type = payload.type or activity.activity_type
        type_or_date_changed = payload.date is not None or payload.type is not None

        if payload.title is not None:
            self.validation_service.validate_title(payload.title)
            activity.title = payload.title
        if payload.description is not None:
            self.validation_service.validate_description(payload.description)
            activity.description = payload.description
        if payload.date is not None:
            self.validation_service.validate_date(payload.date)
            activity.activity_date = payload.date
        if payload.type is not None:
            activity.category = self.validation_service.validate_activity_type(payload.type)
            activity.activity_type = payload.type
        if payload.status is not None:
            activity.status = payload.status
        if payload.dynamic_fields is not None:
            self.validation_service.validate_dynamic_fields(new_type, payload.dynamic_fields)
            activity.dynamic_fields = payload.dynamic_fields

        if self.repository.exists_date_type(new_date, new_type, exclude_id=activity.id):
            raise ConflictError(
                message="An activity of this type already exists on the selected date.",
                code="ACTIVITY_TYPE_DATE_CONFLICT",
            )

        if type_or_date_changed:
            activity.campaign_code = self.campaign_code_service.generate(new_type, new_date)

        activity.version += 1
        saved = self.repository.update(activity)
        return ActivityListResponse(
            success=True,
            message="Activity updated successfully.",
            data=self._to_response(saved, False, user),
        )

    def delete_activity(self, activity_id: UUID) -> dict:
        """Delete a marketing activity."""
        activity = self.repository.get_by_id(activity_id)
        if activity is None:
            raise NotFoundError(
                message="Marketing activity not found.",
                code="ACTIVITY_NOT_FOUND",
            )
        self.repository.delete(activity)
        return {
            "success": True,
            "message": "Activity deleted successfully.",
            "data": None,
        }

    def list_calendar(
        self,
        user: MarketingTeamMember,
        year: int,
        month: int | None = None,
        category: str | None = None,
        activity_type: str | None = None,
        include_performance: bool = False,
    ) -> CalendarResponse:
        """Return annual calendar activities for the requested period."""
        activities = self.repository.list_by_year(
            year=year,
            month=month,
            category=category,
            activity_type=activity_type,
        )
        items = [
            self._to_response(activity, include_performance, user).model_dump(mode="json")
            for activity in activities
        ]
        return CalendarResponse(
            success=True,
            message="Calendar retrieved successfully.",
            data={"year": year, "month": month, "activities": items},
        )
