"""Integration tests for project setup and health (CMC-8)."""

from pathlib import Path

from fastapi.testclient import TestClient

from app.core.config import get_settings

REQUIRED_PATHS = (
    "app/main.py",
    "app/api/v1/router.py",
    "app/api/v1/endpoints/health.py",
    "app/services",
    "app/models",
    "app/repositories",
    "app/db/migrations",
    "app/middleware",
    "tests/unit",
    "tests/integration",
)


def test_cmc8_project_structure_exists() -> None:
    """CMC-8: Standard FastAPI folder tree exists."""
    root = Path(__file__).resolve().parents[2]
    for relative in REQUIRED_PATHS:
        assert (root / relative).exists(), f"Missing required path: {relative}"


def test_cmc8_database_connectivity(verify_database_connectivity: None) -> None:
    """CMC-8: PostgreSQL wired with connectivity verified."""
    assert verify_database_connectivity is None


def test_cmc8_jwt_settings_loaded_from_environment() -> None:
    """CMC-8: JWT auth skeleton env vars available to the application."""
    settings = get_settings()
    assert settings.jwt_secret
    assert settings.jwt_algorithm == "HS256"
    assert settings.access_token_expire_minutes == 30
    assert settings.refresh_token_expire_days == 7


def test_cmc8_env_example_documents_jwt_vars() -> None:
    """CMC-8: .env.example documents JWT configuration variables."""
    env_example = Path(__file__).resolve().parents[2] / ".env.example"
    content = env_example.read_text(encoding="utf-8")
    for var in (
        "JWT_SECRET",
        "JWT_ALGORITHM",
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        "REFRESH_TOKEN_EXPIRE_DAYS",
    ):
        assert var in content


def test_cmc8_get_api_v1_health_returns_200(client: TestClient) -> None:
    """CMC-8: GET /api/v1/health returns 200 with success envelope."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["status"] == "OK"
    assert body["role"] == "system"
    assert body["organization"]


def test_cmc8_openapi_json_accessible(client: TestClient) -> None:
    """CMC-8: OpenAPI JSON schema is reachable locally."""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    body = response.json()
    assert body["info"]["title"]
    assert "/api/v1/health" in body["paths"]


def test_cmc8_swagger_docs_accessible(client: TestClient) -> None:
    """CMC-8: Swagger UI documentation page is reachable."""
    response = client.get("/docs")
    assert response.status_code == 200
    assert "swagger" in response.text.lower()


def test_cmc8_redoc_accessible(client: TestClient) -> None:
    """CMC-8: ReDoc documentation page is reachable."""
    response = client.get("/redoc")
    assert response.status_code == 200


def test_cmc8_sample_unit_tests_importable() -> None:
    """CMC-8: Sample unit tests are present and importable."""
    import tests.unit.test_response
    import tests.unit.test_security  # noqa: F401


def test_cmc8_auth_middleware_registered(client: TestClient) -> None:
    """CMC-8: JWT auth middleware guards non-public API routes."""
    response = client.get("/api/v1/marketing-team-member/profile")
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "UNAUTHORIZED"
