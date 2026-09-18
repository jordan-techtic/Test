"""Role resolution helpers for marketing team members."""

from app.models.marketing_team_member import MarketingTeamMember


def resolve_member_role(member: MarketingTeamMember) -> str:
    """Map member flags to a frontend-facing role label."""
    if not member.is_active:
        return "inactive"
    if not member.is_authorized:
        return "viewer"
    if member.has_performance_access:
        return "admin"
    return "user"
