import posthog from "posthog-js";

// This is a public ingestion key. The site has no accounts or private content.
posthog.init("phc_BfDGZybUFd63jP93BjrVg3UEXm849vQiBEiTMDuwGnbs", {
  api_host: "https://us.i.posthog.com",
  capture_pageview: true,
  autocapture: false,
  disable_session_recording: true,
  // Keep replay off until the approved privacy notice is live on the site.
  capture_exceptions: true,
  person_profiles: "never",
});

// The SDK's rage-click option depends on broad autocapture. Keep autocapture off
// and send only a repeated-click signal, without button text or input values.
let lastTarget: Element | null = null;
let lastClickAt = 0;
let clickCount = 0;
window.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target.closest("button, a, [role='button']") : null;
  if (!target) return;
  const now = Date.now();
  clickCount = target === lastTarget && now - lastClickAt < 700 ? clickCount + 1 : 1;
  lastTarget = target;
  lastClickAt = now;
  if (clickCount === 3) {
    posthog.capture("rage_click_detected", {
      target_type: target.tagName.toLowerCase(),
      page: window.location.pathname,
    });
    clickCount = 0;
  }
}, true);
