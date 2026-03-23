const cheerio = require('cheerio');
const { TECHNOLOGIES } = require('./technologies');

// ─── Rate Limiting ──────────────────────────────────────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const key = ip;
  const entry = rateLimitMap.get(key) || { count: 0, start: now };

  if (now - entry.start > RATE_WINDOW) {
    rateLimitMap.set(key, { count: 1, start: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  rateLimitMap.set(key, { count: entry.count + 1, start: entry.start });
  return false;
}

// Clean old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.start > RATE_WINDOW * 2) rateLimitMap.delete(key);
  }
}, 5 * 60 * 1000);

// ─── URL Validation ─────────────────────────────────────────────────────────
function normalizeUrl(input) {
  let url = input.trim();
  if (!url) return null;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

// ─── Detection Engine ───────────────────────────────────────────────────────
function detectTechnologies(html, headers, cookies) {
  const $ = cheerio.load(html);
  const results = [];
  const startTime = Date.now();

  // Extract script srcs
  const scriptSrcs = [];
  $('script').each((_, el) => {
    const src = $(el).attr('src') || '';
    if (src) scriptSrcs.push(src);
  });

  // Extract all inline script content
  const inlineScripts = [];
  $('script:not([src])').each((_, el) => {
    inlineScripts.push($(el).html() || '');
  });
  const scriptContent = inlineScripts.join('\n');

  // Extract meta tags
  const metaTags = [];
  $('meta').each((_, el) => {
    metaTags.push({
      name: ($(el).attr('name') || '').toLowerCase(),
      property: ($(el).attr('property') || '').toLowerCase(),
      content: ($(el).attr('content') || '').toLowerCase()
    });
  });

  // Extract link tags
  const linkHrefs = [];
  $('link').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (href) linkHrefs.push(href);
  });

  // Full html as lowercase string for general matching
  const htmlLower = html.toLowerCase();

  // Header keys/values as string
  const headerString = Object.entries(headers)
    .map(([k, v]) => `${k.toLowerCase()}: ${v}`)
    .join('\n');

  // Cookie string
  const cookieString = (cookies || '').toLowerCase();

  for (const tech of TECHNOLOGIES) {
    const signals = [];

    // Check scripts
    for (const pattern of (tech.patterns.scripts || [])) {
      const patternLower = pattern.toLowerCase();
      if (scriptSrcs.some(s => s.toLowerCase().includes(patternLower))) {
        signals.push(`script src: ${pattern}`);
      }
      if (scriptContent.toLowerCase().includes(patternLower)) {
        signals.push(`script content: ${pattern}`);
      }
      if (linkHrefs.some(h => h.toLowerCase().includes(patternLower))) {
        signals.push(`link href: ${pattern}`);
      }
    }

    // Check meta tags
    for (const metaPattern of (tech.patterns.meta || [])) {
      const matched = metaTags.some(m => {
        const nameMatch = !metaPattern.name || m.name === metaPattern.name.toLowerCase() || m.property === metaPattern.name.toLowerCase();
        const contentMatch = !metaPattern.content || m.content.includes(metaPattern.content.toLowerCase());
        return nameMatch && contentMatch;
      });
      if (matched) signals.push(`meta: ${metaPattern.name}=${metaPattern.content}`);
    }

    // Check headers
    for (const headerPattern of (tech.patterns.headers || [])) {
      if (headerString.includes(headerPattern.toLowerCase())) {
        signals.push(`header: ${headerPattern}`);
      }
    }

    // Check cookies
    for (const cookiePattern of (tech.patterns.cookies || [])) {
      if (cookieString.includes(cookiePattern.toLowerCase())) {
        signals.push(`cookie: ${cookiePattern}`);
      }
    }

    // Check html content
    for (const htmlPattern of (tech.patterns.html || [])) {
      if (htmlLower.includes(htmlPattern.toLowerCase())) {
        signals.push(`html: ${htmlPattern}`);
      }
    }

    if (signals.length > 0) {
      const confidence = signals.length >= 2 ? 'high' : 'medium';
      results.push({
        id: tech.id,
        name: tech.name,
        category: tech.category,
        confidence,
        signals: signals.slice(0, 3)
      });
    }
  }

  return { technologies: results, scanDuration: Date.now() - startTime };
}

// ─── Main Handler ────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'METHOD_NOT_ALLOWED', message: 'POST required' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: 'RATE_LIMITED',
      message: 'Too many requests. Please wait a moment.'
    });
  }

  const { url: rawUrl } = req.body || {};
  const url = normalizeUrl(rawUrl);

  if (!url) {
    return res.status(400).json({
      success: false,
      error: 'INVALID_URL',
      message: 'Please provide a valid URL'
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GTMTeardown/1.0; +https://antmend.github.io/gtm-teardown)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      redirect: 'follow'
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(200).json({
        success: false,
        error: 'HTTP_ERROR',
        message: `Website returned status ${response.status}`
      });
    }

    const html = await response.text();
    const headers = Object.fromEntries(response.headers.entries());
    const cookies = headers['set-cookie'] || '';

    const { technologies, scanDuration } = detectTechnologies(html, headers, cookies);

    return res.status(200).json({
      success: true,
      url,
      technologies,
      metadata: {
        scanDuration,
        signalsChecked: TECHNOLOGIES.reduce((acc, t) =>
          acc + (t.patterns.scripts?.length || 0) + (t.patterns.html?.length || 0) +
          (t.patterns.cookies?.length || 0) + (t.patterns.headers?.length || 0), 0),
        httpStatus: response.status
      }
    });

  } catch (err) {
    clearTimeout(timeout);

    if (err.name === 'AbortError') {
      return res.status(200).json({
        success: false,
        error: 'FETCH_TIMEOUT',
        message: 'The website took too long to respond'
      });
    }

    return res.status(200).json({
      success: false,
      error: 'FETCH_FAILED',
      message: 'Could not reach the provided URL'
    });
  }
};
