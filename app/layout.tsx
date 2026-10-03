import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://georgefifth.xyz"),
  alternates: { canonical: "/" },
  title: "The Build Log: public build history for hackathon developers",
  description:
    "Explore George Fifth's public build history, hackathon projects, and source links. Try GitQuest, his interactive Git learning game for beginners.",
  openGraph: {
    title: "The Build Log: public build history for hackathon developers",
    description:
      "Explore George Fifth's public build history, hackathon projects, and source links. Try GitQuest, his interactive Git learning game for beginners.",
    url: "https://georgefifth.xyz",
    siteName: "The Build Log",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "The Build Log — a pixel hero stands between a castle and the demon king's tower",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Build Log: public build history for hackathon developers",
    description:
      "Explore George Fifth's public build history, hackathon projects, and source links. Try GitQuest, his interactive Git learning game for beginners.",
    images: ["/og.png"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'%3E%3Crect width='8' height='8' fill='%231a1a2e'/%3E%3Crect x='3' y='1' width='2' height='1' fill='%234dd9e8'/%3E%3Crect x='2' y='2' width='4' height='1' fill='%234dd9e8'/%3E%3Crect x='1' y='3' width='6' height='1' fill='%234dd9e8'/%3E%3Crect x='1' y='4' width='6' height='1' fill='%234dd9e8'/%3E%3Crect x='0' y='5' width='8' height='1' fill='%234dd9e8'/%3E%3Crect x='0' y='6' width='8' height='1' fill='%234dd9e8'/%3E%3Crect x='1' y='7' width='6' height='1' fill='%234dd9e8'/%3E%3Crect x='2' y='3' width='1' height='2' fill='%2310102a'/%3E%3Crect x='5' y='3' width='1' height='2' fill='%2310102a'/%3E%3Crect x='3' y='2' width='1' height='1' fill='%23a8f0f8'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b1e",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://georgefifth.xyz/#creator",
      name: "George Fifth",
      alternateName: "Georgefifth",
      url: "https://georgefifth.xyz/",
      sameAs: [
        "https://github.com/Georgefifth",
        "https://devpost.com/Georgefifth",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://georgefifth.xyz/#website",
      name: "The Build Log",
      url: "https://georgefifth.xyz/",
      creator: { "@id": "https://georgefifth.xyz/#creator" },
    },
    {
      "@type": "CreativeWork",
      "@id": "https://georgefifth.xyz/#firstcommit-gitquest",
      name: "GitQuest: interactive Git learning game for beginners",
      description:
        "George Fifth's browser-based Git practice game. Type Git commands through 11 levels and watch the commit graph change.",
      url: "https://georgefifth.xyz/#firstcommit-gitquest",
      creator: { "@id": "https://georgefifth.xyz/#creator" },
      isPartOf: { "@id": "https://georgefifth.xyz/#website" },
      sameAs: [
        "https://georgefifth.github.io/gitquest/",
        "https://github.com/Georgefifth/gitquest",
        "https://devpost.com/software/gitquest",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
