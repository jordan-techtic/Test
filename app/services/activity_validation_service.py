"""Marketing activity validation rules."""

from datetime import date

from app.core.constants import ACTIVITY_TYPES, DYNAMIC_FIELDS_BY_TYPE
from app.exceptions.http_exceptions import ValidationAppError


class ActivityValidationService:
    """Validate marketing activity business rules."""

    def validate_date(self, activity_date: date) -> None:
        """Ensure activity date is today or in the future."""
        if activity_date < date.today():
            raise ValidationAppError(
                message="Activity date must be today or a future date.",
                code="INVALID_DATE",
                details=[{"field": "date", "message": "Date cannot be in the past."}],
            )

    def validate_title(self, title: str) -> None:
        """Validate activity title length."""
        if not title or len(title) > 100:
            raise ValidationAppError(
                message="Title must be between 1 and 100 characters.",
                code="VALIDATION_ERROR",
                details=[{"field": "title", "message": "Invalid title length."}],
            )

    def validate_description(self, description: str | None) -> None:
        """Validate optional description length."""
        if description is not None and len(description) > 500:
            raise ValidationAppError(
                message="Description must not exceed 500 characters.",
                code="VALIDATION_ERROR",
                details=[{"field": "description", "message": "Description too long."}],
            )

    def validate_activity_type(self, activity_type: str) -> str:
        """Validate activity type and return its category."""
        if activity_type not in ACTIVITY_TYPES:
            raise ValidationAppError(
                message="Invalid activity type.",
                code="INVALID_ACTIVITY_TYPE",
                details=[{"field": "type", "message": "Unknown activity type."}],
            )
        return ACTIVITY_TYPES[activity_type]["category"]

    def validate_dynamic_fields(
        self,
        activity_type: str,
        dynamic_fields: dict | None,
    ) -> None:
        """Validate required dynamic fields for the activity type."""
        required = DYNAMIC_FIELDS_BY_TYPE.get(activity_type, [])
        if not required:
            return
        dynamic_fields = dynamic_fields or {}
        missing = [field for field in required if not dynamic_fields.get(field)]
        if missing:
            raise ValidationAppError(
                message="Required fields missing for activity type.",
                code="VALIDATION_ERROR",
                details=[
                    {"field": field, "message": "This field is required."}
                    for field in missing
                ],
            )
