"""Authentication request and response schemas."""

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.schemas.frontend_context import FrontendContextFields


class LoginRequest(BaseModel):
    """Login credentials using email or username."""

    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "email_or_username": "marketing.user@example.com",
                    "password": "SecurePass1!",
                },
                {
                    "email_or_username": "marketing_user",
                    "password": "SecurePass1!",
                },
            ]
        }
    )

    email_or_username: str = Field(
        ...,
        description=(
            "Registered email address or username. Case-insensitive for email; "
            "username matching is case-sensitive."
        ),
        examples=["marketing.user@example.com", "marketing_user"],
        min_length=1,
        max_length=255,
    )
    password: str = Field(
        ...,
        description="Account password (minimum 8 characters).",
        examples=["SecurePass1!"],
        min_length=8,
        max_length=128,
    )


class TokenData(BaseModel):
    """JWT token pair returned on successful login."""

    access_token: str = Field(
        ...,
        description="JWT access token. Pass as Authorization: Bearer <token> on protected routes.",
        examples=["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."],
    )
    refresh_token: str = Field(
        ...,
        description="JWT refresh token (reserved for future refresh endpoint).",
        examples=["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."],
    )
    token_type: str = Field(default="bearer", description="Token type (always bearer).")
    expires_in: int = Field(
        ...,
        description="Access token lifetime in seconds.",
        examples=[1800],
    )


class LoginResponse(FrontendContextFields):
    """Successful login response envelope."""

    success: bool = Field(default=True, description="Always true on successful login.")
    message: str = Field(default="Login successful.", description="Human-readable result message.")
    data: TokenData = Field(..., description="JWT token pair and metadata.")


class ForgotPasswordRequest(BaseModel):
    """Forgot password initiation request."""

    model_config = ConfigDict(
        json_schema_extra={
            "examples": [{"email": "marketing.user@example.com"}]
        }
    )

    email: EmailStr = Field(
        ...,
        description="Registered email address for password recovery.",
        examples=["marketing.user@example.com"],
    )


class ForgotPasswordResponse(FrontendContextFields):
    """Forgot password initiation response."""

    success: bool = Field(default=True, description="Always true; message is generic for anti-enumeration.")
    message: str = Field(
        default=(
            "If an account exists for this email, password reset instructions "
            "have been sent."
        ),
        description=(
            "Generic confirmation message. Does not reveal whether the email is registered."
        ),
    )
