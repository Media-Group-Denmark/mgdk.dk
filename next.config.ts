import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "newsflow.mgdk.dk",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/news/:slug*",
        destination: "/posts/:slug*",
      },
      {
        source: "/case/:slug*",
        destination: "/posts/:slug*",
      },
      {
        source: "/campaign/:slug*",
        destination: "/posts/:slug*",
      },
      {
        source: "/post/:slug*",
        destination: "/posts/:slug*",
      },
    ];
  },
};

export default nextConfig;
