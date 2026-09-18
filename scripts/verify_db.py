"""Verify PostgreSQL connectivity using the configured DATABASE_URL."""

from sqlalchemy import text

from app.db.session import SessionLocal


def main() -> None:
    """Execute a simple SELECT 1 query to confirm database connectivity."""
    db = SessionLocal()
    try:
        result = db.execute(text("SELECT 1")).fetchone()
        print(f"Database connectivity verified: {result}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
