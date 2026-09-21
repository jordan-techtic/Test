"""Shared frontend context fields for API responses."""

from pydantic import BaseModel, Field


class FrontendContextFields(BaseModel):
    """Fields required by the marketing team member frontend."""

    role: str = Field(
        ...,
        description="Authenticated user role or system/anonymous context.",
        examples=["user"],
    )
    organization: str = Field(
        ...,
        description="Organization scope for frontend routing and display.",
        examples=["Marketing"],
    )
