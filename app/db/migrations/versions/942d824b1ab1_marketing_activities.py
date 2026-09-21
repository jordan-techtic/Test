"""Add marketing activities table.

Revision ID: 942d824b1ab1
Revises: 0002_marketing_team_members
Create Date: 2026-09-21

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "942d824b1ab1"
down_revision: str | None = "0002_marketing_team_members"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Create marketing activities table."""
    op.create_table(
        "marketing_activities",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("title", sa.String(length=100), nullable=False),
        sa.Column("activity_date", sa.Date(), nullable=False),
        sa.Column("activity_type", sa.String(length=50), nullable=False),
        sa.Column("category", sa.String(length=50), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column("campaign_code", sa.String(length=32), nullable=False),
        sa.Column(
            "dynamic_fields",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::jsonb"),
        ),
        sa.Column("created_by", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("version", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["created_by"],
            ["marketing_team_members.id"],
            ondelete="SET NULL",
        ),
        sa.UniqueConstraint("activity_date", "activity_type", name="uq_activity_date_type"),
        sa.UniqueConstraint("campaign_code"),
    )
    op.create_index(
        "ix_marketing_activities_activity_date",
        "marketing_activities",
        ["activity_date"],
    )


def downgrade() -> None:
    """Drop marketing activities table."""
    op.drop_index("ix_marketing_activities_activity_date", table_name="marketing_activities")
    op.drop_table("marketing_activities")
