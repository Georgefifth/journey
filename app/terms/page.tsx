import type { Metadata } from "next";
import NoticePage from "../../components/NoticePage";

export const metadata: Metadata = {
  title: "Terms | The Build Log",
  description: "Terms for visiting George Fifth's public build log.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <NoticePage
    title="TERMS"
    intro="A short guide to using this public build log."
    sections={[
      { heading: "About this site", paragraphs: [
        "The Build Log is George Fifth's public record of hackathons and projects. You can browse it without creating an account or paying a fee.",
        "Project notes describe work at the time they were written. Details, links, and project status may change. Check the linked sources for the latest information.",
      ] },
      { heading: "Links and project work", paragraphs: [
        "Some links open separate sites, such as GitHub, Devpost, or a project demo. Those sites have their own terms and privacy practices.",
        "Links to source code do not change the license shown in each linked repository. Review that license before reusing code or other project material.",
      ] },
      { heading: "Questions", paragraphs: [
        "For a question about this site or its content, email georgefifth@mail.tin.computer.",
      ] },
    ]}
  />;
}
