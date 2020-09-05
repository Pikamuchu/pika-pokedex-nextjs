const withPWA = require('next-pwa');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
  en: 'en',
  es: 'es',
};

module.exports = withPWA({
  target: 'serverless',
  pwa: {
    dest: 'public'
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
  async rewrites() {
    return [...nextI18NextRewrites(localeSubpaths)];
  },
});
