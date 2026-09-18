"""Unit tests for health response schema."""

from app.schemas.health import HealthData, HealthResponse


def test_health_response_model() -> None:
    """HealthResponse model serializes expected envelope fields."""
    response = HealthResponse(
        success=True,
        message="Service is healthy.",
        data=HealthData(status="OK"),
    )
    assert response.success is True
    assert response.data.status == "OK"
