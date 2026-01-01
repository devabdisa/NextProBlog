import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "fast-emu-945.convex.cloud",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
