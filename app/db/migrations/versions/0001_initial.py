"""Initial migration establishing Alembic revision chain.

Revision ID: 0001_initial
Revises:
Create Date: 2026-09-18

"""

from typing import Sequence, Union

# revision identifiers, used by Alembic.
revision: str = "0001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Apply initial migration."""
    pass


def downgrade() -> None:
    """Revert initial migration."""
    pass
