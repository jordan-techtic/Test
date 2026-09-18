"""Klaviyo email adapter for transactional messages."""

from typing import Optional

import httpx
from loguru import logger

from app.core.config import Settings


class KlaviyoEmailService:
    """Send transactional emails via Klaviyo HTTP API."""

    def __init__(self, settings: Settings, client: Optional[httpx.Client] = None) -> None:
        """Initialize Klaviyo email service."""
        self.settings = settings
        self._client = client

    def send_password_reset_email(self, to_email: str, reset_token: str) -> None:
        """Send password reset email with retry on transient failures."""
        if not self.settings.klaviyo_api_key:
            logger.warning("KLAVIYO_API_KEY not configured; skipping reset email.")
            return

        reset_url = (
            f"{self.settings.frontend_reset_password_url.rstrip('/')}"
            f"?token={reset_token}"
        )
        payload = {
            "data": {
                "type": "event",
                "attributes": {
                    "metric": {"name": "Password Reset Requested"},
                    "profile": {"email": to_email},
                    "properties": {"reset_url": reset_url},
                },
            }
        }
        headers = {
            "Authorization": f"Klaviyo-API-Key {self.settings.klaviyo_api_key}",
            "Content-Type": "application/json",
            "revision": "2024-10-15",
        }
        url = f"{self.settings.klaviyo_api_base_url.rstrip('/')}/events/"

        last_error: Exception | None = None
        owns_client = self._client is None
        client = self._client or httpx.Client(timeout=10.0)
        try:
            for attempt in range(3):
                try:
                    response = client.post(url, json=payload, headers=headers)
                    response.raise_for_status()
                    return
                except Exception as exc:  # noqa: BLE001
                    last_error = exc
                    logger.warning(
                        "Klaviyo email attempt {} failed for {}: {}",
                        attempt + 1,
                        to_email,
                        exc,
                    )
        finally:
            if owns_client:
                client.close()

        logger.error("Failed to send password reset email to {}: {}", to_email, last_error)
