import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {url: "https://georgefifth.xyz", lastModified: "2026-10-02", changeFrequency: "weekly", priority: 1},
    {url: "https://georgefifth.xyz/faq", lastModified: "2026-10-02", changeFrequency: "yearly", priority: 0.5},
  ];
}
