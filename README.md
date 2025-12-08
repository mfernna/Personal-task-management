# Personal Task Management

Simple task manager (React + Vite frontend, Laravel backend).

This README contains concise instructions to run both frontend and backend locally, environment examples, and quick troubleshooting tips.

---

## Quick Links

- Frontend: `./src`
- Backend: `./Backend`

## Prerequisites

- Node.js (>=16) and a package manager (npm, yarn, or pnpm)
- PHP (>=8.0) and Composer
- SQLite (recommended for local development) or other DB (MySQL/Postgres)

Notes:

- On Windows `cp` works in PowerShell as an alias for `Copy-Item`, but the README uses cross-platform commands where possible.

## Backend — Run locally

1. Open a terminal and change to the backend folder:

```powershell
cd Backend
```

2. Install PHP dependencies and create the `.env` file:

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

4. Run migrations and start the dev server:

```powershell
php artisan migrate
php artisan serve --port=8000
```

Optional: seed the DB

```powershell
php artisan db:seed
```

Backend dev URL: `http://localhost:8000`

## Frontend — Run locally

From the project root (where `package.json` lives):

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

## Troubleshooting

- CORS errors (e.g. `No 'Access-Control-Allow-Origin' header`):

  - Inspect the OPTIONS preflight in DevTools Network tab.
  - Confirm the preflight response includes `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods`.
  - For development we include a permissive CORS handler; for production use an allowlist and enable `Access-Control-Allow-Credentials` only when needed.

- API 500 on create:

  - Check `Backend/storage/logs/laravel.log` for the full stack trace.
  - Ensure incoming POST body matches controller validation (e.g. `title` required).

- Database errors:
  - Verify `.env` DB settings and that `database/database.sqlite` exists (if using SQLite).

If you want, I can also:

- Add a `.env.example` at the repo root and in `Backend/` (I can create them and commit).
- Harden the CORS setup for production and replace the development fallback.
- Add a short CONTRIBUTING or DEPLOY.md with commands for reviewers.

---

If you want me to commit these README changes and add `.env.example` files, say "Yes — commit and push" and I will create the files and push a branch or update `main` as you prefer.
