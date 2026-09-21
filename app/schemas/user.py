"""Example user validation schema for request body documentation."""

from pydantic import BaseModel, EmailStr, Field


class User(BaseModel):
    """Example user payload demonstrating Pydantic request validation."""

    username: str = Field(
        ...,
        description="Unique username for the user account.",
        examples=["marketing.user"],
        min_length=1,
        max_length=100,
    )
    email: EmailStr = Field(
        ...,
        description="Registered email address.",
        examples=["marketing.user@example.com"],
    )
