"""Unit tests for standard API response helpers."""

from app.schemas.response import error_response, success_response


def test_success_response_shape() -> None:
    """Success response includes success, message, and data keys."""
    payload = success_response(message="OK", data={"status": "OK"})
    assert payload["success"] is True
    assert payload["message"] == "OK"
    assert payload["data"]["status"] == "OK"


def test_error_response_shape() -> None:
    """Error response includes success, message, and error code."""
    payload = error_response(
        message="Validation failed.",
        code="VALIDATION_ERROR",
        details=[{"field": "email", "message": "Invalid email."}],
    )
    assert payload["success"] is False
    assert payload["error"]["code"] == "VALIDATION_ERROR"
    assert payload["error"]["details"][0]["field"] == "email"
