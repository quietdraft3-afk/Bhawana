/** @type {import('next').NextConfig} */
const nextConfig = {
  // Content lives in JSON files that the admin dashboard edits at runtime,
  // so pages must not be frozen at build time.
  experimental: {},
};

export default nextConfig;
