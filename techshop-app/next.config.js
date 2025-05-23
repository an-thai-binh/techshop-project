/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn2.fptshop.com.vn', 'www.apple.com', 'store.storeimages.cdn-apple.com'],
  },
  experimental: {
    serverActions: true,
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

module.exports = nextConfig
