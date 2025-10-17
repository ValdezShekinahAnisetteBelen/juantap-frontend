import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', '127.0.0.1', 'juantap.info'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/avatars/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/defaults/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/avatars/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/defaults/**',
      },
      {
        protocol: 'https',
        hostname: 'juantap.info',
        pathname: '/avatars/**',
      },
      {
        protocol: 'https',
        hostname: 'juantap.info',
        pathname: '/defaults/**',
      },
    ],
  },
};

export default nextConfig;
