"""Application-specific HTTP exception classes."""

from typing import Any, List, Optional


class AppHTTPException(Exception):
    """Base application HTTP exception with stable error code support."""

    def __init__(
        self,
        status_code: int,
        message: str,
        code: str,
        details: Optional[Any] = None,
    ) -> None:
        """Initialize exception with HTTP status, UI-safe message, and error code."""
        self.status_code = status_code
        self.message = message
        self.code = code
        self.details = details
        super().__init__(message)


class UnauthorizedError(AppHTTPException):
    """Raised when authentication is required or credentials are invalid."""

    def __init__(
        self,
        message: str = "Authentication required.",
        code: str = "UNAUTHORIZED",
        details: Optional[Any] = None,
    ) -> None:
        super().__init__(401, message, code, details)


class ForbiddenError(AppHTTPException):
    """Raised when the authenticated user lacks permission."""

    def __init__(
        self,
        message: str = "You do not have permission to perform this action.",
        code: str = "FORBIDDEN",
        details: Optional[Any] = None,
    ) -> None:
        super().__init__(403, message, code, details)


class NotFoundError(AppHTTPException):
    """Raised when a requested resource does not exist."""

    def __init__(
        self,
        message: str = "The requested resource was not found.",
        code: str = "NOT_FOUND",
        details: Optional[Any] = None,
    ) -> None:
        super().__init__(404, message, code, details)


class ConflictError(AppHTTPException):
    """Raised when a request conflicts with existing state."""

    def __init__(
        self,
        message: str = "The request conflicts with existing data.",
        code: str = "CONFLICT",
        details: Optional[Any] = None,
    ) -> None:
        super().__init__(409, message, code, details)


class ValidationAppError(AppHTTPException):
    """Raised for domain-level validation failures."""

    def __init__(
        self,
        message: str = "Validation failed.",
        code: str = "VALIDATION_ERROR",
        details: Optional[List[dict[str, str]]] = None,
    ) -> None:
        super().__init__(422, message, code, details)
