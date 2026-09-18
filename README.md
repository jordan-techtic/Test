# Marketing Content Calendar API

Production-ready FastAPI backend for the Marketing Content Calendar application.

## Prerequisites

- Python 3.11+
- PostgreSQL

## Setup

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET
```

## Database Migrations

```bash
alembic upgrade head
python scripts/verify_db.py
```

## Run the API

```bash
uvicorn app.main:app --reload
```

- API base: `http://127.0.0.1:8000/api/v1`
- Health check: `GET http://127.0.0.1:8000/api/v1/health`
- Swagger UI: `http://127.0.0.1:8000/docs`
- OpenAPI JSON: `http://127.0.0.1:8000/openapi.json`

## Testing

```bash
pytest
```

## Linting & Formatting

```bash
flake8 app tests
black --check app tests
```

## Project Structure

```
app/
  main.py              # ASGI entry point
  api/v1/              # Versioned REST routes
  core/                # Config, security, logging
  db/                  # SQLAlchemy session and Alembic migrations
  models/              # ORM models
  schemas/             # Pydantic DTOs
  services/            # Business logic
  repositories/        # Data access
  middleware/          # CORS, logging, auth, rate limiting
  dependencies/        # FastAPI Depends providers
  exceptions/          # HTTP exceptions and handlers
tests/
  unit/
  integration/
scripts/
```
