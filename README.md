# Budget Analyzing Website — Hardened Edition

This repo contains a React + Express + MongoDB app to track income/expenses with filters and analytics.

## What changed in this fork
- Uses **.env** for secrets (no hardcoded Mongo URI)
- **Password hashing (bcrypt)** and **JWT login**; transactions can accept either `userid` in body (legacy) or token
- `Transaction.amount` is a **Number** (not string); schemas include **timestamps** and useful **indexes**
- Added `/api/health` endpoint
- Added `.env.example`, updated `package.json` scripts and dev setup

## Quick start

```bash
# 1) Backend
cd budget_website
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm install
npm run dev            # runs server (5000) + client (3000)

# or run separately:
npm run server
# in another terminal
cd client && npm start
```

- React app: http://localhost:3000  
- API health: http://localhost:5000/api/health

> First time you add a user/transaction, Atlas will show collections under your database (e.g., `budget.users`, `budget.transactions`).

## Notes
- Existing frontend remains compatible. It will store `{...user, token}` on login.
- Transactions routes will use `req.userId` from the token **if present**; otherwise they fall back to `req.body.userid` (legacy).
