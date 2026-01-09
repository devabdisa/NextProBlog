import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "blessed-stingray-393.convex.site",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
