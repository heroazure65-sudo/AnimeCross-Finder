const ALLOWED_ORIGIN = "https://heroazure65-sudo.github.io";
const MODEL = "gemini-2.5-flash";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Vary": "Origin"
};

const reply = (data, status=200) =>
  new Response(JSON.stringify(data), { status, headers });

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS")
      return new Response(null, {status:204, headers});

    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return reply({ok:true, service:"AnimeCross V8 AI"});
    }

    if (request.method !== "POST" || url.pathname !== "/api/search")
      return reply({error:"Not found"},404);

    if (!env.GEMINI_API_KEY)
      return reply({error:"GEMINI_API_KEY is not configured"},500);

    let body;
    try { body = await request.json(); }
    catch { return reply({error:"Invalid JSON"},400); }

    const anime = String(body?.anime || "").trim();
    const country = String(body?.country || "India").trim();

    if (!anime) return reply({error:"Anime title is required"},400);

    const prompt = `
You are the streaming research engine for AnimeCross Finder V8.

Research "${anime}" for viewers in ${country} using live web search.

Find only legal, official streaming pages where the EXACT anime can be
watched NOW. Do not guess.

Return ONLY this JSON:
{
  "title": "exact anime title",
  "country": "${country}",
  "sources": [
    {
      "provider": "service name",
      "title": "exact page title",
      "url": "https://...",
      "access": "free|ads|subscription|paid",
      "note": "short note"
    }
  ]
}

Rules:
- Use live web search.
- Exact title must match.
- Verify the destination is the actual title/watch page.
- Prefer direct HTTPS pages.
- Never invent URLs.
- No Google search pages.
- No JustWatch.
- No Wikipedia.
- No blogs, aggregators, piracy or download sites.
- No pre-order, coming-soon or unavailable pages.
- No generic provider homepages when an exact page exists.
- No app://, intent:// or market:// links.
- Maximum 8 sources.
- If nothing is confidently verified, sources must be [].
- JSON only.
`;

    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

    let r;
    try {
      r = await fetch(endpoint, {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-goog-api-key":env.GEMINI_API_KEY
        },
        body:JSON.stringify({
          contents:[{parts:[{text:prompt}]}],
          tools:[{google_search:{}}]
        })
      });
    } catch (e) {
      return reply({error:"Gemini connection failed"},502);
    }

    const data = await r.json();

    if (!r.ok) {
      return reply({
        error:"Gemini API error",
        details:data
      },502);
    }

    const text=(data?.candidates?.[0]?.content?.parts||[])
      .map(p=>p?.text||"").join("");

    let result;
    try {
      const match=text.match(/\{[\s\S]*\}/);
      if(!match) throw new Error("No JSON");
      result=JSON.parse(match[0]);
    } catch {
      return reply({
        title:anime,
        country,
        sources:[],
        warning:"No reliable result returned"
      });
    }

    const blocked=[
      "justwatch.com",
      "wikipedia.org",
      "google.com/search"
    ];

    const sources=(Array.isArray(result.sources)?result.sources:[])
      .filter(s=>{
        if(!s || typeof s.url!=="string") return false;
        if(!s.url.startsWith("https://")) return false;
        const u=s.url.toLowerCase();
        return !blocked.some(x=>u.includes(x)) &&
          !u.includes("app://") &&
          !u.includes("intent://") &&
          !u.includes("market://");
      })
      .slice(0,8);

    return reply({
      title:result.title || anime,
      country,
      sources
    });
  }
};
