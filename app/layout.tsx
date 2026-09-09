import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://journey-phi-bay.vercel.app"),
  title: "The Build Log — A Hero's Hackathon Journey",
  description:
    "A hero's journey through hackathon dungeons. What I built, what broke, what I learned.",
  openGraph: {
    title: "The Build Log — A Hero's Hackathon Journey",
    description:
      "A hero's journey through hackathon dungeons. What I built, what broke, what I learned.",
    url: "https://journey-phi-bay.vercel.app",
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
    title: "The Build Log — A Hero's Hackathon Journey",
    description:
      "A hero's journey through hackathon dungeons. What I built, what broke, what I learned.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
