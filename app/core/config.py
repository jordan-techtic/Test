"""Application configuration loaded from environment variables."""

from functools import lru_cache
from typing import Annotated, List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    """Central application settings."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    app_name: str = Field(default="Marketing Content Calendar API", alias="APP_NAME")
    app_version: str = Field(default="1.0.0", alias="APP_VERSION")
    debug: bool = Field(default=False, alias="DEBUG")

    database_url: str = Field(..., alias="DATABASE_URL")

    jwt_secret: str = Field(..., alias="JWT_SECRET")
    jwt_algorithm: str = Field(default="HS256", alias="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(
        default=30,
        alias="ACCESS_TOKEN_EXPIRE_MINUTES",
    )
    refresh_token_expire_days: int = Field(
        default=7,
        alias="REFRESH_TOKEN_EXPIRE_DAYS",
    )
    auth_strategy: str = Field(default="jwt", alias="AUTH_STRATEGY")

    klaviyo_api_key: str = Field(default="", alias="KLAVIYO_API_KEY")
    klaviyo_api_base_url: str = Field(
        default="https://a.klaviyo.com/api",
        alias="KLAVIYO_API_BASE_URL",
    )
    frontend_reset_password_url: str = Field(
        default="http://localhost:3000/reset-password",
        alias="FRONTEND_RESET_PASSWORD_URL",
    )
    password_reset_token_expire_minutes: int = Field(
        default=60,
        alias="PASSWORD_RESET_TOKEN_EXPIRE_MINUTES",
    )

    cors_origins: Annotated[List[str], NoDecode] = Field(
        default=["http://localhost:3000"],
        alias="CORS_ORIGINS",
    )
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")
    rate_limit_default: str = Field(default="100/minute", alias="RATE_LIMIT_DEFAULT")

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: object) -> List[str]:
        """Parse comma-separated CORS origins from environment."""
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        if isinstance(value, list):
            return value
        return ["http://localhost:3000"]


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance."""
    return Settings()
