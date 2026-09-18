"""Campaign code generation service."""

from datetime import date

from app.core.constants import ACTIVITY_TYPES, CATEGORY_CODES


class CampaignCodeService:
    """Generate campaign codes in C{C}-MO{M}-Y{YY} format."""

    def generate(self, activity_type: str, activity_date: date) -> str:
        """Generate a deterministic campaign code for an activity."""
        category = ACTIVITY_TYPES[activity_type]["category"]
        category_code = CATEGORY_CODES[category]
        month = activity_date.month
        year_suffix = activity_date.year % 100
        return f"C{category_code}-MO{month}-Y{year_suffix:02d}"
