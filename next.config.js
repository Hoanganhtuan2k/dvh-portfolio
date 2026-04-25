/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produce a self-contained server bundle in .next/standalone
  // for slim Docker images (Render / Fly.io / Koyeb).
  output: "standalone",
};

module.exports = nextConfig;
