"""Aggregate API v1 routers."""

from fastapi import APIRouter

from app.api.v1.endpoints import health, marketing_team_member_auth

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(marketing_team_member_auth.router)
