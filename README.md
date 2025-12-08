# Personal Task Management

Simple task manager (React + Vite frontend, Laravel backend).

This README contains concise instructions to run both frontend and backend locally, environment examples, and quick troubleshooting tips.

---

## Quick Links

- Frontend: `./src`
- Backend: `./Backend`

## Prerequisites

- Node.js (>=16) and npm or pnpm
- PHP (>=8.0) and Composer
- (Optional) a database: SQLite, MySQL, or Postgres

## Backend — Run locally

1. Open a terminal and go to the backend folder:

```powershell
cd Backend
```

2. Install PHP dependencies and prepare env file:

```powershell
composer install
cp .env.example .env
php artisan key:generate
```

3. Configure DB in `.env` (use SQLite for simplest local setup):

```ini
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

4. Run migrations (if present) and start server:

```powershell
php artisan migrate
php artisan serve --port=8000
```

Backend dev URL: `http://localhost:8000`

## Frontend — Run locally

1. From project root:

```powershell
npm install
cp .env.example .env
# Edit .env and set VITE_BACKEND_URL if needed (default shown below)
npm run dev
```

Frontend dev URL: `http://localhost:5173`

## Environment examples

Root `.env.example` (frontend):

```env
VITE_BACKEND_URL=http://localhost:8000/api
```

`Backend/.env.example` (minimal):

```ini
APP_NAME=PersonalTask
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack

# Database (simple local example)
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173
CORS_ALLOW_CREDENTIALS=false
```

After editing `.env`, reload Laravel config cache:

```powershell
php artisan config:clear
php artisan route:clear
php artisan cache:clear
```

## CORS troubleshooting (common)

- If you see errors like "No 'Access-Control-Allow-Origin' header" or preflight failures:
  - Check Network tab in DevTools for the OPTIONS request's response headers.
  - Ensure the preflight (OPTIONS) response includes `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods`.
  - For development the project uses a simple CORS handler; in production prefer an allowlist and `Access-Control-Allow-Credentials` only when needed.
