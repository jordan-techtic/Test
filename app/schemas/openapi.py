"""Shared OpenAPI response helpers for Swagger documentation."""

from typing import Any

from app.schemas.response import ErrorResponse


def error_example(
    code: str,
    message: str,
    details: Any = None,
    *,
    role: str = "anonymous",
    organization: str = "Marketing",
) -> dict[str, Any]:
    """Build a documented error response example matching ErrorResponse envelope."""
    return {
        "success": False,
        "message": message,
        "role": role,
        "organization": organization,
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

VALIDATION_ERROR_RESPONSE = {
    "model": ErrorResponse,
    "description": "Request validation failed.",
    "content": {
        "application/json": {
            "example": error_example(
                "VALIDATION_ERROR",
                "Validation failed.",
                [{"field": "email", "message": "Invalid email address."}],
            )
        }
    },
}

LOGIN_VALIDATION_ERROR_RESPONSE = {
    "model": ErrorResponse,
    "description": "Login request validation failed.",
    "content": {
        "application/json": {
            "example": error_example(
                "VALIDATION_ERROR",
                "Validation failed.",
                [
                    {
                        "field": "password",
                        "message": "String should have at least 8 characters",
                    }
                ],
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

RATE_LIMIT_ERROR_RESPONSE = {
    "model": ErrorResponse,
    "description": "Too many requests from this client.",
    "content": {
        "application/json": {
            "example": error_example(
                "RATE_LIMIT_EXCEEDED",
                "Too many requests. Please try again later.",
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
    422: LOGIN_VALIDATION_ERROR_RESPONSE,
    429: RATE_LIMIT_ERROR_RESPONSE,
    500: INTERNAL_ERROR_RESPONSE,
}

FORGOT_PASSWORD_ERROR_RESPONSES = {
    422: VALIDATION_ERROR_RESPONSE,
    429: RATE_LIMIT_ERROR_RESPONSE,
    500: INTERNAL_ERROR_RESPONSE,
}
