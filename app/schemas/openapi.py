"""Shared OpenAPI response helpers for Swagger documentation."""

from typing import Any

from app.schemas.response import ErrorResponse


def error_example(code: str, message: str, details: Any = None) -> dict[str, Any]:
    """Build a documented error response example."""
    return {
        "success": False,
        "message": message,
        "error": {"code": code, "details": details},
    }


UNAUTHORIZED_RESPONSE = {
    "model": ErrorResponse,
    "description": "Missing or invalid bearer token.",
    "content": {
        "application/json": {
            "example": error_example(
                "UNAUTHORIZED",
                "Authentication credentials were not provided.",
            )
        }
    },
}

FORBIDDEN_RESPONSE = {
    "model": ErrorResponse,
    "description": "Authenticated user lacks permission or account is inactive.",
    "content": {
        "application/json": {
            "example": error_example(
                "NOT_AUTHORIZED",
                "You are not authorized to access this application.",
            )
        }
    },
}

NOT_FOUND_RESPONSE = {
    "model": ErrorResponse,
    "description": "Requested resource was not found.",
    "content": {
        "application/json": {
            "example": error_example(
                "ACTIVITY_NOT_FOUND",
                "Marketing activity not found.",
            )
        }
    },
}

CONFLICT_RESPONSE = {
    "model": ErrorResponse,
    "description": "Request conflicts with existing data (duplicate or version mismatch).",
    "content": {
        "application/json": {
            "example": error_example(
                "ACTIVITY_TYPE_DATE_CONFLICT",
                "An activity of this type already exists on the selected date.",
            )
        }
    },
}

VALIDATION_ERROR_RESPONSE = {
    "model": ErrorResponse,
    "description": "Request validation failed.",
    "content": {
        "application/json": {
            "example": error_example(
                "VALIDATION_ERROR",
                "Validation failed.",
                [{"field": "date", "message": "Date cannot be in the past."}],
            )
        }
    },
}

INTERNAL_ERROR_RESPONSE = {
    "model": ErrorResponse,
    "description": "Unexpected server error.",
    "content": {
        "application/json": {
            "example": error_example(
                "INTERNAL_SERVER_ERROR",
                "An unexpected error occurred. Please try again later.",
            )
        }
    },
}

AUTH_ERROR_RESPONSES = {
    401: {
        "model": ErrorResponse,
        "description": "Invalid email/username or password.",
        "content": {
            "application/json": {
                "example": error_example(
                    "INVALID_CREDENTIALS",
                    "Invalid email/username or password.",
                )
            }
        },
    },
    403: {
        "model": ErrorResponse,
        "description": "Account inactive or not authorized.",
        "content": {
            "application/json": {
                "examples": {
                    "inactive": {
                        "summary": "Inactive account",
                        "value": error_example(
                            "ACCOUNT_INACTIVE",
                            "Your account is inactive. Contact an administrator.",
                        ),
                    },
                    "unauthorized": {
                        "summary": "Not authorized",
                        "value": error_example(
                            "NOT_AUTHORIZED",
                            "You are not authorized to access this application.",
                        ),
                    },
                }
            }
        },
    },
    422: VALIDATION_ERROR_RESPONSE,
    500: INTERNAL_ERROR_RESPONSE,
}

PROTECTED_ERROR_RESPONSES = {
    401: UNAUTHORIZED_RESPONSE,
    403: FORBIDDEN_RESPONSE,
    422: VALIDATION_ERROR_RESPONSE,
    500: INTERNAL_ERROR_RESPONSE,
}
