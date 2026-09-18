"""SQLAlchemy declarative base and model registry."""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy ORM models."""

    pass


from app.models import (  # noqa: E402, F401
    MarketingActivity,
    MarketingTeamMember,
    PasswordResetToken,
)
