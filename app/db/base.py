"""SQLAlchemy declarative base and model registry."""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy ORM models."""

    pass


# Import models here as they are added so Alembic autogenerate discovers them.
# Example: from app.models.user import User  # noqa: F401
