/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuildErrors: true,
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
