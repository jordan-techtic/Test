# Marketing Content Calendar API

FastAPI backend for the Marketing Content Calendar application.

## Requirements

- Python 3.11+
- PostgreSQL

## Setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
pip install -r requirements.txt
pip install -e .
```

3. Run database migrations:

```bash
alembic upgrade head
```

4. Verify database connectivity:

```bash
python scripts/verify_db.py
```

## Run

```bash
uvicorn app.main:app --reload
```

- API base: `http://127.0.0.1:8000/api/v1`
- Health: `GET /api/v1/health`
- Swagger UI: `http://127.0.0.1:8000/docs`
- OpenAPI JSON: `http://127.0.0.1:8000/openapi.json`

## Test

```bash
pytest
flake8 app tests
black --check app tests
```

## Lint & Format

```bash
flake8 app tests
black app tests
```
