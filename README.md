# GTM Teardown API

Serverless backend for [GTM Teardown](https://antmend.github.io/gtm-teardown/). Fetches any website server-side, parses the HTML, and returns a list of detected GTM technologies with confidence scores.

**Endpoint:** `https://gtm-teardown-api.vercel.app/api/analyze`

---

## Why a backend?

Browser-based fetch requests to third-party domains fail due to CORS restrictions. This serverless function runs server-side, bypassing that entirely — it can fetch any public website without CORS issues and parse the full HTML response.

---

## API

### `POST /api/analyze`

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response (success):**
```json
{
  "success": true,
  "url": "https://example.com",
  "technologies": [
    {
      "id": "google-analytics-4",
      "name": "Google Analytics 4",
      "category": "analytics",
      "confidence": "high",
      "signals": ["script: gtag.js", "html: G-"]
    },
    {
      "id": "intercom",
      "name": "Intercom",
      "category": "chat_support",
      "confidence": "high",
      "signals": ["script: widget.intercom.io", "html: intercomSettings"]
    }
  ],
  "metadata": {
    "scanDuration": 1240,
    "signalsChecked": 312,
    "httpStatus": 200
  }
}
```

**Response (error):**
```json
{
  "success": false,
  "error": "FETCH_TIMEOUT",
  "message": "The website took too long to respond"
}
```

### Error codes

| Code | Description |
|------|-------------|
| `INVALID_URL` | URL format not recognized |
| `FETCH_TIMEOUT` | Site did not respond within 8 seconds |
| `FETCH_FAILED` | Site unreachable |
| `HTTP_ERROR` | Site returned 4xx or 5xx |
| `RATE_LIMITED` | Too many requests from this IP (10/min limit) |
| `NETWORK_ERROR` | Internal network failure |

---

## Detection logic

For each request the function:

1. Validates and normalizes the URL (adds `https://` if missing)
2. Fetches the page with a realistic User-Agent header and an 8-second timeout
3. Parses the HTML response with [cheerio](https://cheerio.js.org/)
4. Runs each of 60+ technology fingerprints against:
   - Script `src` attributes
   - Inline script content
   - `<meta>` tags
   - HTTP response headers
   - Cookie names (`Set-Cookie` header)
   - HTML content patterns
5. Returns matched technologies with confidence levels

**Confidence:**
- `high` — 2+ independent signals matched
- `medium` — 1 strong signal matched
- `low` — 1 weak/ambiguous signal matched

---

## Tech stack

- **Runtime:** Node.js (Vercel serverless)
- **HTML parsing:** Cheerio
- **Rate limiting:** In-memory Map (10 req/IP/min)
- **Deploy:** Vercel free tier, auto-deploy on push to `main`

---

## Local development

```bash
git clone https://github.com/AntMend/gtm-teardown-api
cd gtm-teardown-api
npm install
npx vercel dev
# → http://localhost:3000/api/analyze
```

Test it:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://stripe.com"}'
```

---

## Deploy

Connected to Vercel. Push to `main` → auto-deploys.

```bash
git push origin main
```

---

## Related

- **Frontend:** [AntMend/gtm-teardown](https://github.com/AntMend/gtm-teardown)
- **Live app:** [antmend.github.io/gtm-teardown](https://antmend.github.io/gtm-teardown/)

---

Built by [AntMend](https://github.com/AntMend)
