"""Klaviyo performance metrics adapter."""

from typing import Optional

import httpx
from loguru import logger

from app.core.config import Settings
from app.schemas.marketing_activity import PerformanceMetrics


class KlaviyoPerformanceService:
    """Retrieve campaign performance metrics from Klaviyo."""

    def __init__(self, settings: Settings, client: Optional[httpx.Client] = None) -> None:
        """Initialize Klaviyo performance service."""
        self.settings = settings
        self._client = client

    def get_metrics_by_campaign_code(
        self,
        campaign_code: str,
    ) -> Optional[PerformanceMetrics]:
        """Fetch performance metrics for a campaign code."""
        if not self.settings.klaviyo_api_key:
            return None

        headers = {
            "Authorization": f"Klaviyo-API-Key {self.settings.klaviyo_api_key}",
            "Accept": "application/json",
            "revision": "2024-10-15",
        }
        url = (
            f"{self.settings.klaviyo_api_base_url.rstrip('/')}"
            f"/campaigns/?filter=equals(name,'{campaign_code}')"
        )

        owns_client = self._client is None
        client = self._client or httpx.Client(timeout=10.0)
        try:
            response = client.get(url, headers=headers)
            response.raise_for_status()
            payload = response.json()
            stats = payload.get("data", [{}])[0].get("attributes", {})
            return PerformanceMetrics(
                revenue=stats.get("revenue"),
                open_rate=stats.get("open_rate"),
                click_rate=stats.get("click_rate"),
                delivered_orders=stats.get("delivered_orders"),
            )
        except Exception as exc:  # noqa: BLE001
            logger.warning(
                "Failed to fetch Klaviyo metrics for {}: {}",
                campaign_code,
                exc,
            )
            return None
        finally:
            if owns_client:
                client.close()
