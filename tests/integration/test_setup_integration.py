"""Integration tests for project setup and health (CMC-8)."""

from fastapi.testclient import TestClient

from app.core.config import get_settings


def test_database_connectivity(verify_database_connectivity: None) -> None:
    """CMC-8: Database wired for PostgreSQL with connectivity verified."""
    assert verify_database_connectivity is None


def test_jwt_settings_loaded_from_environment() -> None:
    """CMC-8: JWT auth skeleton env vars are available to the application."""
    settings = get_settings()
    assert settings.jwt_secret
    assert settings.jwt_algorithm == "HS256"
    assert settings.access_token_expire_minutes == 30
    assert settings.refresh_token_expire_days == 7


def test_get_api_v1_health_returns_200(client: TestClient) -> None:
    """CMC-8: GET /api/v1/health returns 200 with success envelope."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["status"] == "OK"


def test_openapi_json_accessible(client: TestClient) -> None:
    """CMC-8: OpenAPI JSON schema is reachable locally."""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    body = response.json()
    assert body["info"]["title"]
    assert "/api/v1/health" in body["paths"]


def test_swagger_docs_accessible(client: TestClient) -> None:
    """CMC-8: Swagger UI documentation page is reachable."""
    response = client.get("/docs")
    assert response.status_code == 200
    assert "swagger" in response.text.lower()
