/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['modern-minds-bucket.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
