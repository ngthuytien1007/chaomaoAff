/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Whitelist Supabase Storage + any other external image hosts
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {},
};

module.exports = nextConfig;
