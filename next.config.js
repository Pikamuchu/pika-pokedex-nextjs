/* eslint-disable no-param-reassign */
const withPWA = require('next-pwa');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
  en: 'en',
  es: 'es',
};

// Using ./src as root directory
module.exports = withPWA({
  target: 'serverless',
  distDir: '../.next',
  pwa: {
    dest: '../public',
  },
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  webpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'inline-source-map';
    }
    return config;
  },
});
