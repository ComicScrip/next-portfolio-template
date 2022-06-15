const withPWA = require("next-pwa");
const { i18n } = require("./next-i18next.config");

module.exports = withPWA({
  i18n,
  reactStrictMode: true,
  images: {
    domains: ["ucarecdn.com"],
  },
  pwa: {
    disable: process.env.NODE_ENV !== "production",
    dest: "public",
  },
});
