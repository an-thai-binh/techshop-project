import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn2.fptshop.com.vn', 'www.apple.com', 'store.storeimages.cdn-apple.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:8080/:path*',
      },
    ]
  },
}

export default nextConfig
