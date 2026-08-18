/**
 * First-party analytics proxy.
 *
 * Why this exists: beaconing straight to script.google.com is a cross-origin
 * POST, which is exactly the shape heuristic blockers (Privacy Badger, Brave
 * Shields, corporate filtering) kill on sight — ERR_BLOCKED_BY_CLIENT, with no
 * error the page can see. Routed through the site's own domain it is a
 * same-origin request to the host the visitor deliberately opened, which
 * blockers cannot drop without breaking the page itself.
 *
 * Deploy as a Cloudflare Worker with a route of:
 *   hirnaymay.com/api/track*
 *
 * Everything else on the domain passes through untouched to GitHub Pages.
 */

const UPSTREAM =
  'https://script.google.com/macros/s/AKfycbyLJ4mLnXWz1YZUZ18u3aiRVjX5Xbph9lkyzVlMinxK_N8O0RMmrZUov4dUxjSyLY7U5w/exec';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Anything that is not the tracking path is none of this Worker's
    // business — hand it back to the origin.
    if (!url.pathname.startsWith('/api/track')) {
      return fetch(request);
    }

    // Health check: GET /api/track proxies the script's own status page, so
    // the first-party path can be verified in a browser.
    if (request.method === 'GET') {
      const r = await fetch(UPSTREAM, { redirect: 'follow' });
      return new Response(await r.text(), {
        status: r.status,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }

    if (request.method !== 'POST') {
      return new Response('method not allowed', { status: 405 });
    }

    const body = await request.text();

    // Cap the payload. A queued batch is a few KB; anything far past that is
    // someone poking at the endpoint.
    if (body.length > 64 * 1024) {
      return new Response('too large', { status: 413 });
    }

    // Apps Script answers a POST with a 302 to script.googleusercontent.com
    // and only serves the body there. redirect:'follow' handles it; the write
    // has already happened by the time the redirect is issued either way.
    const upstream = await fetch(UPSTREAM, {
      method: 'POST',
      headers: { 'content-type': 'text/plain;charset=UTF-8' },
      body,
      redirect: 'follow',
    });

    // The page never reads this — sendBeacon discards the response — but a
    // real status makes the endpoint debuggable with curl.
    return new Response(upstream.ok ? 'ok' : 'upstream ' + upstream.status, {
      status: upstream.ok ? 200 : 502,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  },
};
