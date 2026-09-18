"""Marketing team member data access."""

from uuid import UUID

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.marketing_team_member import MarketingTeamMember


class MarketingTeamMemberRepository:
    """Repository for marketing team member persistence."""

    def __init__(self, db: Session) -> None:
        """Initialize repository with database session."""
        self.db = db

    def get_by_id(self, user_id: UUID) -> MarketingTeamMember | None:
        """Return user by primary key."""
        return self.db.get(MarketingTeamMember, user_id)

    def get_by_email(self, email: str) -> MarketingTeamMember | None:
        """Return user by email address."""
        return (
            self.db.query(MarketingTeamMember)
            .filter(MarketingTeamMember.email == email.lower())
            .first()
        )

    def get_by_username(self, username: str) -> MarketingTeamMember | None:
        """Return user by username."""
        return (
            self.db.query(MarketingTeamMember)
            .filter(MarketingTeamMember.username == username)
            .first()
        )

    def get_by_email_or_username(self, identifier: str) -> MarketingTeamMember | None:
        """Return user matching email or username."""
        normalized = identifier.lower()
        return (
            self.db.query(MarketingTeamMember)
            .filter(
                or_(
                    MarketingTeamMember.email == normalized,
                    MarketingTeamMember.username == identifier,
                )
            )
            .first()
        )

    def create(self, user: MarketingTeamMember) -> MarketingTeamMember:
        """Persist a new marketing team member."""
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
