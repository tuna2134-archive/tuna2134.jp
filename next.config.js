/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.STANDALONE === 'true') {
  nextConfig.output = "standalone";
};

module.exports = nextConfig;
