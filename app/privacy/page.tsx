import type { Metadata } from "next";
import NoticePage from "../../components/NoticePage";

export const metadata: Metadata = {
  title: "Privacy | The Build Log",
  description: "How The Build Log handles visitor data and site analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <NoticePage
    title="PRIVACY"
    intro="What this site records when you visit and explore the build log."
    sections={[
      { heading: "What you choose to share", paragraphs: [
        "You can browse without an account. The site has no signup, checkout, or visitor form. If you email Georgefifth, your message and address reach the site's managed mailbox so Georgefifth can respond.",
        "The optional sound setting stays in your browser's local storage. It is not sent to the site as a preference.",
      ] },
      { heading: "Site analytics", paragraphs: [
        "The site uses PostHog to count pageviews and selected actions, including starting the journey, choosing a quest, and opening a build link. Build-link events include a build ID and link type.",
        "PostHog receives an anonymous visitor ID and technical visit details, such as page address, referrer, browser, and device information. Its browser software uses cookies and local storage to keep that ID across visits. The site does not send your name or email to PostHog, create visitor profiles, record sessions, or capture every click.",
        "Georgefifth uses these counts to understand which parts of the build log people use. PostHog processes this analytics data in its US-hosted service.",
      ] },
      { heading: "Other services", paragraphs: [
        "Vercel hosts the site and receives standard web requests, which can include your IP address and browser details. Google Fonts supplies the site's typefaces, so your browser also requests font files from Google.",
        "If you open a GitHub, Devpost, or demo link, that site handles your visit under its own privacy practices.",
      ] },
      { heading: "Questions or requests", paragraphs: [
        "Email georgefifth@mail.tin.computer with a question about data from your visit or a request about data you shared by email. Include enough detail to locate the message or visit. Georgefifth can review what is available and respond.",
        "This notice will change if the site's data practices change. The date above shows when this version was last updated.",
      ] },
    ]}
  />;
}
