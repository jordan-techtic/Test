"""Helpers for frontend context fields on API responses."""

from app.core.config import get_settings
from app.models.marketing_team_member import MarketingTeamMember
from app.utils.member_role import resolve_member_role


def build_frontend_context(
    user: MarketingTeamMember | None = None,
    *,
    role: str | None = None,
) -> dict[str, str]:
    """Build role and organization fields for response envelopes."""
    settings = get_settings()
    resolved_role = role or (resolve_member_role(user) if user else "system")
    return {
        "role": resolved_role,
        "organization": settings.organization,
    }
