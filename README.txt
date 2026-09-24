ANIMECROSS V8 AI WORKER

Upload these files to a GitHub repository:
- worker.js
- wrangler.jsonc

Then connect that repository to the existing animecross-ai
Cloudflare Worker using Workers Builds.

IMPORTANT:
Keep GEMINI_API_KEY as a Cloudflare Secret.
Do NOT put the key in GitHub.

Health test:
https://YOUR-WORKER-DOMAIN.workers.dev/health

Expected response:
{"ok":true,"service":"AnimeCross V8 AI"}

API:
POST /api/search
JSON body:
{"anime":"One Piece","country":"India"}

The Worker uses Gemini with Google Search grounding to find
current legal official streaming pages.
