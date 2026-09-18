"""Campaign code generation service."""

from datetime import date

from app.core.constants import ACTIVITY_TYPES, CATEGORY_CODES


class CampaignCodeService:
    """Generate campaign codes in C{C}-MO{M}-Y{YY}-{TYPE} format."""

    def generate(self, activity_type: str, activity_date: date) -> str:
        """Generate a unique campaign code for an activity type and date."""
        category = ACTIVITY_TYPES[activity_type]["category"]
        category_code = CATEGORY_CODES[category]
        month = activity_date.month
        year_suffix = activity_date.year % 100
        type_suffix = activity_type[:3].upper()
        return f"C{category_code}-MO{month}-Y{year_suffix:02d}-{type_suffix}"
