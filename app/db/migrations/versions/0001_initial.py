"""Initial migration establishing Alembic revision chain.

Revision ID: 0001_initial
Revises:
Create Date: 2026-09-18

"""

from collections.abc import Sequence

# revision identifiers, used by Alembic.
revision: str = "0001_initial"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Apply initial migration."""


def downgrade() -> None:
    """Revert initial migration."""
