/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER: process.env.DB_USER,
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  },
};

module.exports = nextConfig;
