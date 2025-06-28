/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure allowed development origins to fix cross-origin warnings
  allowedDevOrigins: [
    'localhost:3000',
    '192.168.161.2:3000',
    '127.0.0.1:3000',
  ],
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig