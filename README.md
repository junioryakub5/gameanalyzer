# GameAnalyzer

Premium football predictions platform. Users pay to unlock expert betting tips with verified results.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage (`gameanalyzer-tips` bucket) |
| Payments | Paystack (Ghana/Nigeria) |
| Frontend hosting | Vercel |
| Backend hosting | VPS — port 5003, nginx port 8080 |
| Process manager | PM2 (`gameanalyzer-api`) |

## Setup Checklist (New Deployment)

Before deploying, complete these steps:

1. **Supabase** — Create a new project at https://supabase.com
   - Run the SQL in `backend/supabase-schema.sql` in the SQL Editor
   - Create a **public** storage bucket named `gameanalyzer-tips`
   - Copy your `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` (service_role)

2. **Paystack** — Register at https://paystack.com
   - Get your `sk_live_` (secret key) and `pk_live_` (public key)
   - Register webhook URL: `https://YOUR_DOMAIN/api/payment/webhook`

3. **VPS** — Provision a new VPS (DigitalOcean / Hetzner / Vultr)
   - Install Node 20, Nginx, PM2
   - Clone this repo to `/var/www/gameanalyzer`
   - Copy `backend/.env` with real values to the VPS
   - Replace `YOUR_NEW_VPS_IP` in `nginx.conf`, `next.config.js`, `vercel.json`

4. **Vercel** — Create a new Vercel project
   - `vercel link` from the `frontend/` directory
   - Set `NEXT_PUBLIC_PAYSTACK_KEY` as an environment variable in Vercel dashboard

5. **Admin token** — Generate a strong random token:
   ```
   openssl rand -hex 32
   ```
   Set it as `ADMIN_TOKEN` in `backend/.env`

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5003
NODE_ENV=production
PAYSTACK_SECRET_KEY=sk_live_...
ADMIN_TOKEN=<generated with openssl rand -hex 32>
CLIENT_URL=https://gameanalyzer.vercel.app,https://YOUR_DOMAIN
SUPABASE_URL=https://YOUR_REF.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
SUPABASE_BUCKET=gameanalyzer-tips
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5003/api
NEXT_PUBLIC_PAYSTACK_KEY=pk_live_...
```

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

## VPS Deployment

```bash
# SSH to VPS
ssh root@YOUR_NEW_VPS_IP

# Update app
cd /var/www/gameanalyzer && git pull
cd backend && npm install --production
pm2 restart gameanalyzer-api
```

## Paystack Webhook

Register this URL in your Paystack dashboard:
```
https://YOUR_DOMAIN/api/payment/webhook
```

## Admin Access

Go to `/portal` and enter your `ADMIN_TOKEN` to access the dashboard.
