import type { NextConfig } from "next";

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://localhost:8080/:path*",
      },
    ];
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["img.freepik.com"],
  },
};

export default nextConfig;
