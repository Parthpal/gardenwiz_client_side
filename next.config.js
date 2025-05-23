/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  };
  
  module.exports = nextConfig;