/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  staticPageGenerationTimeout: 3000,
  images: {
    domains: [
      'x3rkl8tapynlmqus.public.blob.vercel-storage.com'
    ],
  }
}

module.exports = nextConfig
