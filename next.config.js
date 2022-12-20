/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['192.168.2.175', "api.lycorisa.com"],
  },
  distDir: 'build',
}

module.exports = nextConfig
