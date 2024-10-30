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
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'supports-color': false
      };
    }
    return config;
  },
}

module.exports = nextConfig
