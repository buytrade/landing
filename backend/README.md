# Backend (BuyTrade) — Minimal API

This folder contains a minimal Node.js + Express backend that provides a simple endpoint to accept waitlist email signups and store them in MongoDB.

## Requirements
- Node.js 18+ (or compatible)
- A running MongoDB instance (local or remote). By default the server will connect to `mongodb://127.0.0.1:27017`.

## Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Copy `.env.example` to `.env` and edit if needed.

3. Start the server (dev):

```bash
npm run dev
```

The server will listen on the port defined in `.env` (default 4000).

## API

- POST /api/signup
  - Body: `{ "email": "user@example.com" }`
  - Returns 201 on new signup, 200 if already signed up, 400 for validation errors.

Example:

```bash
curl -X POST http://localhost:4000/api/signup -H "Content-Type: application/json" -d '{"email":"you@example.com"}'
```

- GET /api/waitlist (dev)
  - Returns recent signups (up to 200).

## Notes
- This is intentionally minimal. When you want real production usage, add authentication, rate-limiting, input sanitization, monitoring, and deploy behind TLS.
