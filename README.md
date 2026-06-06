# 365Analyst

Premium football predictions platform. Users pay to unlock expert betting tips with verified results.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage (`analyst-tips` bucket) |
| Payments | Paystack (Ghana) + Moniepoint bank transfer (Nigeria) |
| Frontend hosting | Vercel |
| Backend hosting | VPS — port 5003, nginx port 8080 |
| Process manager | PM2 (`analyst-api`) |

## Live URLs

- **Production:** https://365analyst.vercel.app
- **Admin Panel:** https://365analyst.vercel.app/portal
- **Backend API:** http://72.60.23.133:8080/api/health

## Local Development

```bash
# Start everything (backend + frontend + Cloudflare tunnels)
./start.sh
```

Or manually:

```bash
# Backend (port 5003)
cd backend && node server.js

# Frontend (port 3002)
cd frontend && PORT=3002 npm run dev
```

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5003
NODE_ENV=production
PAYSTACK_SECRET_KEY=sk_...
ADMIN_TOKEN=...
CLIENT_URL=https://365analyst.vercel.app
SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_KEY=eyJ...
SUPABASE_BUCKET=analyst-tips
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5003/api
NEXT_PUBLIC_PAYSTACK_KEY=pk_...
```

## Database Setup

Run the SQL in `backend/supabase-schema.sql` in the Supabase SQL editor.
Then create a **public** storage bucket named `analyst-tips`.

## VPS Deployment

```bash
# SSH to VPS
ssh root@72.60.23.133

# Update app
cd /var/www/365analyst && git pull
cd backend && npm install --production
pm2 restart analyst-api
```

## Paystack Webhook

Register this URL in your Paystack dashboard:
```
https://365analyst.vercel.app/api/payment/webhook
```

## Nigeria Payment

Bank transfer to **Moniepoint MFB** — account details shown in the payment modal.
After transfer, user sends receipt to **@notyourregulardude** on Telegram.

## Admin Access

Go to `/portal` and enter your `ADMIN_TOKEN` to access the dashboard.
