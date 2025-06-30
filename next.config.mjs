/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable static generation for dynamic pages
  output: 'standalone',
  // Fix for Windows OneDrive and webpack cache issues
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Disable webpack cache on Windows to prevent EPERM errors
      config.cache = false;
      
      // Alternative: Use memory cache instead of filesystem
      // config.cache = {
      //   type: 'memory',
      //   maxGenerations: 1,
      // };
    }
    
    return config;
  },
  // Experimental features to improve stability
  experimental: {
    // Disable webpack cache in development
    webpackBuildWorker: false,
  },
  // Disable static generation for pages that need dynamic data
  async generateStaticParams() {
    return [];
  },
}

export default nextConfig
