/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  staticPageGenerationTimeout: 1000,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/astria/packs',
          destination: '/api/astria/packs'
        }
      ]
    }
  }
}

module.exports = nextConfig
