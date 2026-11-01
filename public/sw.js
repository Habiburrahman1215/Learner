/* HR Learning Zone service worker
   Offline strategy:
   - App shell + built assets: cache-first (instant, works with no network)
   - Navigations: network-first with cache fallback, then offline shell
   - Everything the learner studies is bundled into the JS, so a warm cache
     makes the whole library available with the radio switched off. */

const VERSION = "hlz-v3";
const SHELL = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;

const PRECACHE = [
  "/",
  "/dashboard",
  "/learn",
  "/practice",
  "/review",
  "/progress",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL).then((cache) =>
      Promise.allSettled(PRECACHE.map((url) => cache.add(new Request(url, { cache: "reload" })))),
    ).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Never intercept Supabase / cross-origin API traffic.
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          const shell = await caches.match("/dashboard");
          if (shell) return shell;
          return caches.match("/") || new Response("Offline", { status: 503 });
        }),
    );
    return;
  }

  // Static assets: cache-first.
  if (/\/_next\/static\/|\/icon-|\.(png|svg|woff2?|css|js|webmanifest)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
            return res;
          }).catch(() => cached),
      ),
    );
    return;
  }

  // Anything else: try network, fall back to cache.
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || new Response("", { status: 504 }))),
  );
});
