# EcoPulse AI

Local development and QA runbook for EcoPulse AI (Citizen reporting + Worker verification).

Prerequisites
- Node.js 18+ and npm
- MongoDB connection (Atlas or local). If no DB is provided, server uses offline demo stores.

Quick start

1) Start backend

```bash
cd server
npm install
# create .env (see .env.example)
npm run dev
```

2) Start frontend

```bash
cd client
npm install
npm run dev
```

Useful environment variables (`server/.env`)
- `PORT` (default `5000`)
- `MONGODB_URI` (optional; if missing demo offline store used)
- `CLIENT_URL` (e.g., `http://localhost:5173`)
- `GEMINI_API_KEY` (optional — only for Gemini verification)

Manual E2E checklist
- Citizen: Report Issue -> Upload image -> Analyze -> Submit Complaint -> Verify complaint appears in My Complaints.
- Worker: Open assigned task -> Upload `Before Image (pre-clean)` and `After Image (post-clean)` -> Submit Cleanup for AI Verification -> Confirm timeline updates.
- Supervisor: Confirm escalations after repeated ignores appear in Supervisor Dashboard.

Troubleshooting
- If Vite shows an overlay error, open browser DevTools Console and copy the error text.
- If server fails to start, check `server/.env` and share the terminal stack trace with the team.

Handoff notes
- Key files edited for QA and UX: `server/utils/aiWasteAnalysis.js`, `server/controllers/complaintController.js`, `client/src/pages/worker/WorkersTaskDetails.jsx`, `client/src/components/dashboard/Topbar.jsx`, `client/src/layouts/AdminLayout.jsx`.

Contact
- When reporting runtime errors, include server terminal logs and browser console output.
