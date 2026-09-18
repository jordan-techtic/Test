"""Integration tests for marketing calendar and activities (CMC-42)."""

from datetime import date, timedelta

from fastapi.testclient import TestClient

from app.models.marketing_team_member import MarketingTeamMember


def _activity_payload(activity_date: str, activity_type: str = "email_send") -> dict:
    """Build a valid activity create payload."""
    dynamic_fields = {
        "email_send": {"subject_line": "Spring sale launch"},
        "sms_send": {"message_preview": "Flash sale today"},
        "content_publish": {"channel": "blog"},
        "focus_campaign": {"focus_area": "retention"},
    }
    return {
        "title": "Integration Test Activity",
        "date": activity_date,
        "type": activity_type,
        "description": "Created by integration test",
        "dynamic_fields": dynamic_fields[activity_type],
    }


def test_get_calendar_year_view(client: TestClient, auth_headers: dict[str, str], future_date: str) -> None:
    """CMC-42: User can view entire year calendar."""
    create_resp = client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(future_date),
        headers=auth_headers,
    )
    assert create_resp.status_code == 201

    year = int(future_date[:4])
    response = client.get(
        f"/api/v1/marketing-team-member/calendar?year={year}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["year"] == year
    assert len(body["data"]["activities"]) >= 1


def test_get_calendar_month_filter(client: TestClient, auth_headers: dict[str, str], future_date: str) -> None:
    """CMC-42: Users can navigate between months via month query param."""
    assert client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(future_date),
        headers=auth_headers,
    ).status_code == 201

    year = int(future_date[:4])
    month = int(future_date[5:7])
    response = client.get(
        f"/api/v1/marketing-team-member/calendar?year={year}&month={month}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    activities = response.json()["data"]["activities"]
    assert all(item["date"].startswith(f"{year}-{month:02d}") for item in activities)


def test_calendar_activities_include_color(client: TestClient, auth_headers: dict[str, str], future_date: str) -> None:
    """CMC-42: Activities displayed as colored entries on scheduled dates."""
    assert client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(future_date, "email_send"),
        headers=auth_headers,
    ).status_code == 201

    year = int(future_date[:4])
    response = client.get(
        f"/api/v1/marketing-team-member/calendar?year={year}",
        headers=auth_headers,
    )
    activity = response.json()["data"]["activities"][0]
    assert activity["color"] == "#4F46E5"
    assert activity["date"] == future_date


def test_create_activity_happy_path(client: TestClient, auth_headers: dict[str, str], future_date: str) -> None:
    """CMC-42: Create marketing activities via POST."""
    response = client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(future_date),
        headers=auth_headers,
    )
    assert response.status_code == 201
    body = response.json()
    assert body["success"] is True
    assert body["data"]["title"] == "Integration Test Activity"
    assert body["data"]["type"] == "email_send"
    assert body["data"]["version"] == 1
    assert "id" in body["data"]


def test_create_activity_persists_dynamic_fields(
    client: TestClient,
    auth_headers: dict[str, str],
    future_date: str,
) -> None:
    """CMC-42: Dynamic field display based on activity type."""
    response = client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(future_date, "email_send"),
        headers=auth_headers,
    )
    assert response.status_code == 201
    assert response.json()["data"]["dynamic_fields"]["subject_line"] == "Spring sale launch"


def test_create_activity_missing_dynamic_fields_returns_422(
    client: TestClient,
    auth_headers: dict[str, str],
    future_date: str,
) -> None:
    """CMC-42: Field validation for required dynamic information."""
    response = client.post(
        "/api/v1/marketing-team-member/activities",
        json={
            "title": "Missing Fields",
            "date": future_date,
            "type": "email_send",
        },
        headers=auth_headers,
    )
    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_create_activity_past_date_returns_422(client: TestClient, auth_headers: dict[str, str]) -> None:
    """Edge case: past activity dates are rejected."""
    past = (date.today() - timedelta(days=1)).isoformat()
    response = client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(past),
        headers=auth_headers,
    )
    assert response.status_code == 422
    assert response.json()["error"]["code"] == "INVALID_DATE"


def test_create_duplicate_date_and_type_returns_409(
    client: TestClient,
    auth_headers: dict[str, str],
    future_date: str,
) -> None:
    """Error case: duplicate activity type on same date returns conflict."""
    payload = _activity_payload(future_date)
    assert client.post(
        "/api/v1/marketing-team-member/activities",
        json=payload,
        headers=auth_headers,
    ).status_code == 201

    response = client.post(
        "/api/v1/marketing-team-member/activities",
        json=payload,
        headers=auth_headers,
    )
    assert response.status_code == 409
    assert response.json()["error"]["code"] == "ACTIVITY_TYPE_DATE_CONFLICT"


def test_get_activity_by_id(client: TestClient, auth_headers: dict[str, str], future_date: str) -> None:
    """CMC-42: Retrieve specific marketing activity details."""
    create_body = client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(future_date),
        headers=auth_headers,
    ).json()
    activity_id = create_body["data"]["id"]

    response = client.get(
        f"/api/v1/marketing-team-member/activities/{activity_id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    assert response.json()["data"]["id"] == activity_id


def test_update_activity_happy_path(client: TestClient, auth_headers: dict[str, str], future_date: str) -> None:
    """CMC-42: Update existing marketing activity."""
    create_body = client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(future_date),
        headers=auth_headers,
    ).json()
    activity_id = create_body["data"]["id"]
    version = create_body["data"]["version"]

    response = client.put(
        f"/api/v1/marketing-team-member/activities/{activity_id}",
        json={"title": "Updated Title", "version": version},
        headers=auth_headers,
    )
    assert response.status_code == 200
    body = response.json()
    assert body["data"]["title"] == "Updated Title"
    assert body["data"]["version"] == version + 1


def test_update_activity_version_conflict_returns_409(
    client: TestClient,
    auth_headers: dict[str, str],
    future_date: str,
) -> None:
    """Error case: stale version triggers optimistic locking conflict."""
    create_body = client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(future_date),
        headers=auth_headers,
    ).json()
    activity_id = create_body["data"]["id"]

    response = client.put(
        f"/api/v1/marketing-team-member/activities/{activity_id}",
        json={"title": "Stale Update", "version": 999},
        headers=auth_headers,
    )
    assert response.status_code == 409
    assert response.json()["error"]["code"] == "VERSION_CONFLICT"


def test_delete_activity(client: TestClient, auth_headers: dict[str, str], future_date: str) -> None:
    """CMC-42: Delete marketing activity."""
    create_body = client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(future_date),
        headers=auth_headers,
    ).json()
    activity_id = create_body["data"]["id"]

    response = client.delete(
        f"/api/v1/marketing-team-member/activities/{activity_id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    assert response.json()["success"] is True

    get_resp = client.get(
        f"/api/v1/marketing-team-member/activities/{activity_id}",
        headers=auth_headers,
    )
    assert get_resp.status_code == 404


def test_get_activity_not_found_returns_404(client: TestClient, auth_headers: dict[str, str]) -> None:
    """Error case: unknown activity ID returns 404."""
    missing_id = "00000000-0000-0000-0000-000000000099"
    response = client.get(
        f"/api/v1/marketing-team-member/activities/{missing_id}",
        headers=auth_headers,
    )
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "ACTIVITY_NOT_FOUND"


def test_create_activity_invalid_type_returns_422(
    client: TestClient,
    auth_headers: dict[str, str],
    future_date: str,
) -> None:
    """Edge case: unknown activity type fails pydantic validation."""
    response = client.post(
        "/api/v1/marketing-team-member/activities",
        json={
            "title": "Bad Type",
            "date": future_date,
            "type": "unknown_type",
            "dynamic_fields": {},
        },
        headers=auth_headers,
    )
    assert response.status_code == 422


def test_create_activity_unicode_title(
    client: TestClient,
    auth_headers: dict[str, str],
    future_date: str,
) -> None:
    """Edge case: unicode characters in title are accepted."""
    payload = _activity_payload(future_date)
    payload["title"] = "Campagne été 🎉"
    response = client.post(
        "/api/v1/marketing-team-member/activities",
        json=payload,
        headers=auth_headers,
    )
    assert response.status_code == 201
    assert response.json()["data"]["title"] == "Campagne été 🎉"


def test_calendar_include_performance_with_admin_access(
    client: TestClient,
    admin_auth_headers: dict[str, str],
    admin_user: MarketingTeamMember,
    future_date: str,
) -> None:
    """CMC-42: Performance metrics included when user has permission."""
    alt_date = (date.fromisoformat(future_date) + timedelta(days=5)).isoformat()
    payload = _activity_payload(alt_date, "sms_send")
    assert client.post(
        "/api/v1/marketing-team-member/activities",
        json=payload,
        headers=admin_auth_headers,
    ).status_code == 201

    year = int(alt_date[:4])
    response = client.get(
        f"/api/v1/marketing-team-member/calendar?year={year}&include_performance=true",
        headers=admin_auth_headers,
    )
    assert response.status_code == 200
    performance = response.json()["data"]["activities"][0]["performance"]
    assert performance is not None
    assert performance["revenue"] == 1250.50


def test_calendar_include_performance_without_access_returns_null(
    client: TestClient,
    auth_headers: dict[str, str],
    future_date: str,
) -> None:
    """CMC-42: Users without performance access do not receive metrics."""
    assert client.post(
        "/api/v1/marketing-team-member/activities",
        json=_activity_payload(future_date),
        headers=auth_headers,
    ).status_code == 201

    year = int(future_date[:4])
    response = client.get(
        f"/api/v1/marketing-team-member/calendar?year={year}&include_performance=true",
        headers=auth_headers,
    )
    assert response.status_code == 200
    assert response.json()["data"]["activities"][0]["performance"] is None
