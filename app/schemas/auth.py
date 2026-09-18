"""Authentication request and response schemas."""

from pydantic import BaseModel, EmailStr, Field

from app.schemas.frontend_context import FrontendContextFields


class LoginRequest(BaseModel):
    """Login credentials using email or username."""

    email_or_username: str = Field(
        ...,
        description="Registered email address or username.",
        examples=["marketing.user@example.com"],
        min_length=1,
        max_length=255,
    )
    password: str = Field(
        ...,
        description="Account password.",
        examples=["SecurePass1!"],
        min_length=8,
        max_length=128,
    )


class TokenData(BaseModel):
    """JWT token pair returned on successful login."""

    access_token: str = Field(..., description="JWT access token.")
    refresh_token: str = Field(..., description="JWT refresh token.")
    token_type: str = Field(default="bearer", description="Token type.")
    expires_in: int = Field(..., description="Access token lifetime in seconds.")


class LoginResponse(FrontendContextFields):
    """Successful login response envelope."""

    success: bool = Field(default=True)
    message: str = Field(default="Login successful.")
    data: TokenData


class ForgotPasswordRequest(BaseModel):
    """Forgot password initiation request."""

    email: EmailStr = Field(
        ...,
        description="Registered email address for password recovery.",
        examples=["marketing.user@example.com"],
    )


class ForgotPasswordResponse(FrontendContextFields):
    """Forgot password initiation response."""

    success: bool = Field(default=True)
    message: str = Field(
        default=(
            "If an account exists for this email, password reset instructions "
            "have been sent."
        )
    )
