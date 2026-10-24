/** @type {import('next').NextConfig} */
const nextConfig = {
  // Content and uploads are read from disk at request time, so make sure
  // they're bundled with the server functions when deployed.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
    "/uploads/[...file]": ["./uploads/**/*"],
  },
};

export default nextConfig;
