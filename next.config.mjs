const isPages = process.env.STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages build: static export served from a sub-path (see .github/workflows/pages.yml).
  ...(isPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
