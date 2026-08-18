/**
 * First-party site analytics.
 *
 * Loaded on every page. Records a visit as a single evolving session rather
 * than a pile of disconnected page views, so the question "did someone arrive
 * from LinkedIn, read two writeups, and then open the résumé" has a one-row
 * answer.
 *
 * Captured
 *   - source: referrer host, or utm_* / ?s= when present
 *   - journey: pages in order, count, cumulative focused seconds
 *   - device: type, screen, viewport, browser, OS, language, timezone
 *   - coarse location and network org, via one lookup (see GEO below)
 *   - clicks on things that matter: résumé, projects, writing, outbound
 *
 * Not captured, deliberately
 *   - No canvas/audio/font fingerprinting. It exists to defeat incognito,
 *     it breaks on every browser update, and it is the difference between
 *     analytics and surveillance.
 *   - No keystrokes, no mouse paths, no session replay.
 *
 * Reliability
 *   Every payload goes through a localStorage queue. If a beacon fails — the
 *   tab dies, the network drops, an extension blocks it — the payload stays
 *   queued and rides along with the next successful send, on this or any
 *   later page. Losing an event now needs the visitor to never come back.
 */
(function () {
  "use strict";

  // Preferred: a same-origin path, proxied to the backend by a Cloudflare
  // Worker (tools/cloudflare-worker.js). Blockers cannot drop a request to
  // the host the visitor is already on.
  var ENDPOINT = "/api/track";

  // Used only until the Worker is live, and automatically after the
  // first-party path is seen to 404. This is a cross-origin POST, which is
  // the shape heuristic blockers kill — expect to lose visitors here.
  var FALLBACK =
    "https://script.google.com/macros/s/AKfycbyLJ4mLnXWz1YZUZ18u3aiRVjX5Xbph9lkyzVlMinxK_N8O0RMmrZUov4dUxjSyLY7U5w/exec";

  // One lookup per visit, cached for the session. Set to "" to stop resolving
  // IP entirely — everything else keeps working.
  var GEO = "https://ipwho.is/";

  var QUEUE = "tk_q";
  var IDLE = 30 * 60 * 1000; // a gap this long starts a new session

  if (!ENDPOINT) return;

  /* ---------------- storage helpers, all failure-tolerant ------------- */
  function ls(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) {}
    return null;
  }
  function ss(k, v) {
    try {
      if (v === undefined) return sessionStorage.getItem(k);
      sessionStorage.setItem(k, v);
    } catch (e) {}
    return null;
  }
  function rnd() {
    return (Math.random().toString(36).slice(2) + Date.now().toString(36)).slice(0, 16);
  }

  /* ---------------- identity ------------------------------------------ */
  var visitor = ls("tk_vid");
  if (!visitor) { visitor = rnd(); ls("tk_vid", visitor); }

  var now = Date.now();
  var lastSeen = parseInt(ls("tk_seen") || "0", 10);
  var session = ss("tk_sid");
  var fresh = false;

  if (!session || (lastSeen && now - lastSeen > IDLE)) {
    session = rnd();
    ss("tk_sid", session);
    ss("tk_journey", "");
    ss("tk_pages", "0");
    ss("tk_secs", "0");
    fresh = true;
  }
  ls("tk_seen", String(now));

  var visit = parseInt(ls("tk_visits") || "0", 10);
  if (fresh) { visit += 1; ls("tk_visits", String(visit)); }

  /* ---------------- where they came from ------------------------------ */
  var qs = new URLSearchParams(location.search);
  function clean(v, n) {
    return (v || "").toString().toLowerCase().replace(/[^a-z0-9_.\-\/ ]/g, "").slice(0, n || 60);
  }

  var refHost = "";
  try {
    if (document.referrer) {
      var rh = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (rh !== location.hostname) refHost = rh;
    }
  } catch (e) {}

  var link = clean(qs.get("s") || qs.get("src"), 40);
  var source = clean(qs.get("utm_source")) || refHost || (fresh ? "direct" : "");
  var campaign = clean(qs.get("utm_campaign") || qs.get("utm_medium"));

  // The source of a visit is whatever brought them to the *first* page.
  if (fresh) {
    ss("tk_source", source || "direct");
    ss("tk_campaign", campaign);
    ss("tk_landed", location.pathname);
    if (link) ss("tk_link", link);
  } else if (link && !ss("tk_link")) {
    ss("tk_link", link);
  }

  /* ---------------- device -------------------------------------------- */
  var ua = navigator.userAgent;
  function pick(pairs) {
    for (var i = 0; i < pairs.length; i++) if (pairs[i][1].test(ua)) return pairs[i][0];
    return "other";
  }
  var browser = pick([
    ["Edge", /Edg\//], ["Opera", /OPR\//], ["Samsung", /SamsungBrowser/],
    ["Chrome", /Chrome\//], ["Safari", /Safari\//], ["Firefox", /Firefox\//],
  ]);
  var os = pick([
    ["iOS", /iPhone|iPad|iPod/], ["Android", /Android/], ["macOS", /Mac OS X/],
    ["Windows", /Windows NT/], ["Linux", /Linux/],
  ]);
  var device = /iPad|Tablet/.test(ua)
    ? "tablet"
    : /Mobi|Android|iPhone/.test(ua)
      ? "mobile"
      : "desktop";

  var base = {
    session: session,
    visitor: visitor,
    visit: visit,
    returning: visit > 1,
    source: ss("tk_source") || "direct",
    campaign: ss("tk_campaign") || "",
    landed: ss("tk_landed") || location.pathname,
    link: ss("tk_link") || "",
    device: device,
    browser: browser,
    os: os,
    screen: screen.width + "x" + screen.height +
      (window.devicePixelRatio > 1 ? " @" + window.devicePixelRatio + "x" : ""),
  };

  /* ---------------- queue + transport --------------------------------- */
  function queued() {
    try { return JSON.parse(ls(QUEUE) || "[]"); } catch (e) { return []; }
  }
  function setQueue(q) { ls(QUEUE, JSON.stringify(q.slice(-40))); }

  // pagehide/visibilitychange have to use sendBeacon; everything else uses
  // fetch so failures are detectable.
  var leaving = false;

  function flush(extra) {
    var q = queued();
    if (extra) q.push(extra);
    if (!q.length) return;
    var body = JSON.stringify({ batch: q });
    var url = ss("tk_ep") || ENDPOINT;

    // Unloading: sendBeacon is the only transport that survives the page
    // going away. It reports whether the browser *queued* the request, not
    // whether it arrived, so the payload is kept until a verified send.
    if (leaving && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: "text/plain;charset=UTF-8" }));
      return;
    }

    // Otherwise use fetch, because a rejected promise is how a blocked
    // request becomes visible. sendBeacon returns true and swallows
    // ERR_BLOCKED_BY_CLIENT silently, which is how this went unnoticed.
    post(url, body, function (ok) {
      if (ok) { setQueue([]); return; }
      // First-party path missing means the Worker is not deployed yet.
      if (url === ENDPOINT && FALLBACK) {
        ss("tk_ep", FALLBACK);
        post(FALLBACK, body, function (ok2) { if (ok2) setQueue([]); else setQueue(q); });
        return;
      }
      // Blocked or offline: hold everything for a later page or visit.
      setQueue(q);
    });
  }

  function post(url, body, done) {
    // Same-origin: a normal fetch, so the HTTP status is readable and a
    // missing Worker (404) is distinguishable from a successful write.
    // Cross-origin: no-cors is forced, the response is opaque, and the only
    // observable failure is the promise rejecting — which is what a blocked
    // request does.
    var sameOrigin = url.charAt(0) === "/";
    var opts = {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: body,
    };
    if (!sameOrigin) opts.mode = "no-cors";

    try {
      fetch(url, opts)
        .then(function (res) { done(sameOrigin ? res.ok : true); })
        .catch(function () { done(false); });
    } catch (e) {
      done(false);
    }
  }

  /* ---------------- focused time + journey ---------------------------- */
  var priorSecs = parseInt(ss("tk_secs") || "0", 10);
  var focused = 0;
  var since = document.visibilityState === "visible" ? Date.now() : null;
  function accrue() { if (since !== null) { focused += Date.now() - since; since = null; } }
  function resume() { if (since === null) since = Date.now(); }
  function secs() {
    return priorSecs + Math.round((focused + (since !== null ? Date.now() - since : 0)) / 1000);
  }

  var pages = parseInt(ss("tk_pages") || "0", 10) + 1;
  ss("tk_pages", String(pages));
  var journey = ss("tk_journey") || "";
  journey = (journey ? journey + " > " : "") + location.pathname;
  if (journey.length > 900) journey = journey.slice(-900);
  ss("tk_journey", journey);

  function payload(extra) {
    var o = { event: "page", journey: journey, pages: pages, seconds: secs() };
    for (var k in base) o[k] = base[k];
    if (extra) for (var j in extra) o[j] = extra[j];
    return o;
  }

  flush(payload());

  /* ---------------- geo, once per session ----------------------------- */
  if (GEO && !ss("tk_geo")) {
    ss("tk_geo", "1");
    try {
      fetch(GEO)
        .then(function (r) { return r.json(); })
        .then(function (g) {
          if (!g || g.success === false) return;
          var info = {
            ip: g.ip || "",
            city: g.city || "",
            country: g.country || "",
            org: (g.connection && (g.connection.org || g.connection.isp)) || "",
          };
          ss("tk_org", info.org || "");
          flush(payload(info));
        })
        .catch(function () {});
    } catch (e) {}
  }

  /* ---------------- clicks worth knowing about ------------------------ */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a || !a.getAttribute) return;
    var href = a.getAttribute("href") || "";
    var kind =
      /\/resume\/|resume\.pdf/i.test(href) ? "resume"
      : /^https?:/i.test(href) && href.indexOf(location.hostname) === -1 ? "outbound"
      : /^\/writing\//.test(href) ? "writing"
      : /^\/projects\//.test(href) ? "project"
      : "";
    if (!kind) return;
    accrue();
    flush(payload({ click: kind + ":" + clean(href, 80) }));
    resume();
  }, true);

  /* ---------------- lifecycle ----------------------------------------- */
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") resume();
    else {
      accrue(); ss("tk_secs", String(secs()));
      leaving = true; flush(payload()); leaving = false;
    }
  });
  window.addEventListener("blur", accrue);
  window.addEventListener("focus", resume);
  window.addEventListener("pagehide", function () {
    leaving = true;
    accrue(); ss("tk_secs", String(secs())); flush(payload());
  });

  // Exposed so /resume/ can log its own reading time against this session.
  window.__track = {
    session: session, visitor: visitor, visit: visit,
    base: base, flush: flush,
    geo: function () { return { org: ss("tk_org") || "" }; },
  };
})();
