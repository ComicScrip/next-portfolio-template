const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['ucarecdn.com'],
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || process.env.DEPLOY_PRIME_URL,
  },
});
