/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(process.env.JOURNEY_STATIC_EXPORT === "1" ? {
    output: "export",
    images: { unoptimized: true },
  } : {}),
};

module.exports = nextConfig;
