import posthog from "posthog-js";

// This is a public ingestion key. The site has no accounts or private content.
posthog.init("phc_BfDGZybUFd63jP93BjrVg3UEXm849vQiBEiTMDuwGnbs", {
  api_host: "https://us.i.posthog.com",
  capture_pageview: true,
  autocapture: false,
  disable_session_recording: true,
  // Keep replay off until the approved privacy notice is live on the site.
  // Rage-clicks remain a small event signal without recording page contents.
  rageclick: true,
  capture_exceptions: true,
  person_profiles: "never",
});
