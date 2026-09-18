"""Marketing activity data access."""

from datetime import date
from typing import Optional
from uuid import UUID

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.exceptions.http_exceptions import ConflictError
from app.models.marketing_activity import MarketingActivity


class MarketingActivityRepository:
    """Repository for marketing activity persistence."""

    def __init__(self, db: Session) -> None:
        """Initialize repository with database session."""
        self.db = db

    def create(self, activity: MarketingActivity) -> MarketingActivity:
        """Persist a new marketing activity."""
        try:
            self.db.add(activity)
            self.db.commit()
            self.db.refresh(activity)
            return activity
        except IntegrityError as exc:
            self.db.rollback()
            raise ConflictError(
                message="An activity with conflicting data already exists.",
                code="ACTIVITY_CONFLICT",
            ) from exc

    def get_by_id(self, activity_id: UUID) -> Optional[MarketingActivity]:
        """Return activity by primary key."""
        return self.db.get(MarketingActivity, activity_id)

    def update(self, activity: MarketingActivity) -> MarketingActivity:
        """Persist activity updates."""
        try:
            self.db.commit()
            self.db.refresh(activity)
            return activity
        except IntegrityError as exc:
            self.db.rollback()
            raise ConflictError(
                message="An activity with conflicting data already exists.",
                code="ACTIVITY_CONFLICT",
            ) from exc

    def delete(self, activity: MarketingActivity) -> None:
        """Delete an activity."""
        self.db.delete(activity)
        self.db.commit()

    def exists_date_type(
        self,
        activity_date: date,
        activity_type: str,
        exclude_id: Optional[UUID] = None,
    ) -> bool:
        """Return True if an activity exists for date and type."""
        query = self.db.query(MarketingActivity).filter(
            MarketingActivity.activity_date == activity_date,
            MarketingActivity.activity_type == activity_type,
        )
        if exclude_id is not None:
            query = query.filter(MarketingActivity.id != exclude_id)
        return query.first() is not None

    def list_by_year(
        self,
        year: int,
        category: Optional[str] = None,
        activity_type: Optional[str] = None,
        month: Optional[int] = None,
    ) -> list[MarketingActivity]:
        """Return activities for a calendar year with optional filters."""
        if month:
            start = date(year, month, 1)
            end = date(year + 1, 1, 1) if month == 12 else date(year, month + 1, 1)
            query = self.db.query(MarketingActivity).filter(
                MarketingActivity.activity_date >= start,
                MarketingActivity.activity_date < end,
            )
        else:
            query = self.db.query(MarketingActivity).filter(
                MarketingActivity.activity_date >= date(year, 1, 1),
                MarketingActivity.activity_date <= date(year, 12, 31),
            )
        if category:
            query = query.filter(MarketingActivity.category == category)
        if activity_type:
            query = query.filter(MarketingActivity.activity_type == activity_type)
        return query.order_by(MarketingActivity.activity_date.asc()).all()
