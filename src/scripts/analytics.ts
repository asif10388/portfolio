// PostHog analytics. Production only, loaded once the page is idle so it never delays first paint.
// Requests go to /ingest on this site, which Netlify proxies to PostHog (see netlify.toml), so ad blockers
// don't drop them.
import type { PostHog } from "posthog-js"
import { SITE } from "@/data/site"

let posthog: PostHog | undefined

async function start() {
  const { key, uiHost } = SITE.posthog
  if (!key || !import.meta.env.PROD) return

  const mod = await import("posthog-js")
  posthog = mod.default
  posthog.init(key, {
    api_host: "/ingest",
    ui_host: uiHost,
    // Pinned defaults: captures pageviews on history changes, which covers Astro's ClientRouter navigation.
    defaults: "2026-08-30",
    // Visitors are anonymous; don't create person profiles for them.
    person_profiles: "identified_only",
  })
}

if ("requestIdleCallback" in window) requestIdleCallback(() => void start(), { timeout: 3000 })
else setTimeout(() => void start(), 1500)

// Clicks on the calls to action: <a data-track="resume" data-placement="hero">.
document.addEventListener("click", event => {
  const el = (event.target as Element | null)?.closest<HTMLElement>("[data-track]")
  if (!el || !posthog) return
  posthog.capture(
    "cta_clicked",
    { cta: el.dataset.track, placement: el.dataset.placement, href: el.getAttribute("href") },
    // sendBeacon survives the page unloading when the link navigates away (e.g. the résumé PDF).
    { transport: "sendBeacon" },
  )
})
