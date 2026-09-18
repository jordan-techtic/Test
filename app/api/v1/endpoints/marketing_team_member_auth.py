"""Marketing team member authentication endpoints."""

from fastapi import APIRouter, Depends, status

from app.dependencies.services import get_auth_service, get_forgot_password_service
from app.schemas.auth import (
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    LoginRequest,
    LoginResponse,
)
from app.services.auth_service import AuthService
from app.services.forgot_password_service import ForgotPasswordService

router = APIRouter(prefix="/marketing-team-member", tags=["marketing-team-member-auth"])


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    summary="Marketing team member login",
    description="Authenticate with registered email or username and password.",
    responses={
        401: {"description": "Invalid credentials."},
        403: {"description": "Account inactive or unauthorized."},
        422: {"description": "Validation error."},
    },
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
    summary="Initiate password recovery",
    description="Send password reset instructions for a registered email address.",
    responses={
        422: {"description": "Validation error."},
    },
)
async def forgot_password(
    body: ForgotPasswordRequest,
    forgot_password_service: ForgotPasswordService = Depends(get_forgot_password_service),
) -> ForgotPasswordResponse:
    """Initiate forgot-password flow."""
    return forgot_password_service.initiate_reset(body.email)
