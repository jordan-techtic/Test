"""Integration tests for health and OpenAPI endpoints."""

from fastapi.testclient import TestClient


def test_get_api_v1_health_returns_200(client: TestClient) -> None:
    """GET /api/v1/health returns 200 with standard success envelope."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["status"] == "OK"
    assert "message" in body


def test_openapi_json_accessible(client: TestClient) -> None:
    """OpenAPI JSON schema is reachable."""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    body = response.json()
    assert body["info"]["title"]
    assert "/api/v1/health" in body["paths"]


def test_swagger_docs_accessible(client: TestClient) -> None:
    """Swagger UI documentation page is reachable."""
    response = client.get("/docs")
    assert response.status_code == 200
    assert "swagger" in response.text.lower()
