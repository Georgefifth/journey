import posthog from "posthog-js";

// This is a public ingestion key. The site has no accounts or private content.
posthog.init("phc_BfDGZybUFd63jP93BjrVg3UEXm849vQiBEiTMDuwGnbs", {
  api_host: "https://us.i.posthog.com",
  capture_pageview: true,
  autocapture: false,
  disable_session_recording: true,
  person_profiles: "never",
});
