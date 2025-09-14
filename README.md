# Budget Analyzing Website 

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




