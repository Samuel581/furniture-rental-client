import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@schedule-x/react',
    '@schedule-x/calendar',
    '@schedule-x/theme-default',
    '@schedule-x/events-service'
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      dns: false,
      tls: false,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
