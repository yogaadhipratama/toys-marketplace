import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Hapus experimental.turbopack
  // experimental: {
    // turbopack: {
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;