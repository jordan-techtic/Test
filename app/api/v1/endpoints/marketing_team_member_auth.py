"""Marketing team member authentication endpoints."""

from fastapi import APIRouter, Depends, status

from app.dependencies.services import get_auth_service, get_forgot_password_service
from app.schemas.auth import (
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    LoginRequest,
    LoginResponse,
)
from app.schemas.openapi import AUTH_ERROR_RESPONSES, FORGOT_PASSWORD_ERROR_RESPONSES
from app.services.auth_service import AuthService
from app.services.forgot_password_service import ForgotPasswordService

router = APIRouter(prefix="/marketing-team-member", tags=["marketing-team-member-auth"])


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    operation_id="marketingTeamMemberLogin",
    summary="Marketing team member login",
    description=(
        "Authenticate a marketing team member using a registered email address or username "
        "and password. Returns a JWT access/refresh token pair on success. "
        "Inactive accounts receive 403 with code ACCOUNT_INACTIVE. "
        "Unauthorized (viewer) accounts receive 403 with code NOT_AUTHORIZED. "
        "Invalid credentials receive 401 with code INVALID_CREDENTIALS without revealing "
        "whether the identifier exists. Public — no Bearer token required to call this endpoint."
    ),
    responses={
        200: {
            "description": "Login successful.",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Login successful.",
                        "role": "user",
                        "organization": "Marketing",
                        "data": {
                            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                            "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                            "token_type": "bearer",
                            "expires_in": 1800,
                        },
                    }
                }
            },
        },
        **AUTH_ERROR_RESPONSES,
    },
    openapi_extra={"security": []},
)
async def login(
    body: LoginRequest,
    auth_service: AuthService = Depends(get_auth_service),
) -> LoginResponse:
    """Authenticate marketing team member and return JWT tokens."""
    return auth_service.login(body.email_or_username, body.password)


@router.post(
    "/forgot-password",
    response_model=ForgotPasswordResponse,
    status_code=status.HTTP_200_OK,
    operation_id="marketingTeamMemberForgotPassword",
    summary="Initiate password recovery",
    description=(
        "Start the password recovery flow for a registered email address. "
        "Always returns HTTP 200 with a generic success message to avoid revealing whether "
        "the email is registered (anti-enumeration). When the account exists, is active, "
        "and is authorized, a time-limited reset token is stored and a reset email is "
        "sent via Klaviyo. Inactive or unauthorized accounts are silently skipped. "
        "Public — no Bearer token required to call this endpoint."
    ),
    responses={
        200: {
            "description": "Password reset initiation accepted.",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": (
                            "If an account exists for this email, password reset "
                            "instructions have been sent."
                        ),
                        "role": "anonymous",
                        "organization": "Marketing",
                    }
                }
            },
        },
        **FORGOT_PASSWORD_ERROR_RESPONSES,
    },
    openapi_extra={"security": []},
)
async def forgot_password(
    body: ForgotPasswordRequest,
    forgot_password_service: ForgotPasswordService = Depends(get_forgot_password_service),
) -> ForgotPasswordResponse:
    """Initiate forgot-password flow."""
    return forgot_password_service.initiate_reset(body.email)
