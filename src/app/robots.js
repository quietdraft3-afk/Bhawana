const BASE = process.env.SITE_URL || "https://bhawanaaryal.com.np";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
