"""Sample user schema for request validation demonstration."""

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    """Basic user fields used for validation examples."""

    username: str = Field(
        ...,
        description="Unique username for the user.",
        examples=["marketing_user"],
        min_length=1,
        max_length=100,
    )
    email: EmailStr = Field(
        ...,
        description="Registered email address.",
        examples=["user@example.com"],
    )
