"""Password reset token data access."""

from datetime import datetime, timezone
from typing import Optional

from sqlalchemy.orm import Session

from app.models.password_reset_token import PasswordResetToken


class PasswordResetTokenRepository:
    """Repository for password reset token persistence."""

    def __init__(self, db: Session) -> None:
        """Initialize repository with database session."""
        self.db = db

    def create_token(self, token: PasswordResetToken) -> PasswordResetToken:
        """Persist a password reset token."""
        self.db.add(token)
        self.db.commit()
        self.db.refresh(token)
        return token

    def get_valid_token(self, token_hash: str) -> Optional[PasswordResetToken]:
        """Return unused, unexpired token by hash."""
        now = datetime.now(timezone.utc)
        return (
            self.db.query(PasswordResetToken)
            .filter(
                PasswordResetToken.token_hash == token_hash,
                PasswordResetToken.used_at.is_(None),
                PasswordResetToken.expires_at > now,
            )
            .first()
        )

    def mark_used(self, token: PasswordResetToken) -> None:
        """Mark token as used."""
        token.used_at = datetime.now(timezone.utc)
        self.db.commit()
