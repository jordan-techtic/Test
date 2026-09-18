"""Loguru logging configuration."""

import sys

from loguru import logger

from app.core.config import get_settings


def setup_logging() -> None:
    """Configure application logging to stderr and rotating log files."""
    settings = get_settings()
    logger.remove()
    logger.add(
        sys.stderr,
        level=settings.log_level,
        format=(
            "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | "
            "<level>{level: <8}</level> | "
            "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - "
            "<level>{message}</level>"
        ),
    )
    logger.add(
        "logs/{time:YYYY-MM-DD}.log",
        rotation="1 day",
        retention="10 days",
        enqueue=True,
        level=settings.log_level,
    )
