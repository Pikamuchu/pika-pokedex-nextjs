/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const { i18n } = require('./next-i18next.config');

console.log(`Using env config ${process.env.NODE_ENV}`);

const nextConfig = {
  reactStrictMode: false,
  i18n,
  sassOptions: {
    silenceDeprecations: [
      'color-functions',
      'global-builtin',
      'import',
      'slash-div',
      'legacy-js-api',
    ],
    quietDeps: true,
  },
  webpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'inline-source-map';
    }
    return config;
  },
};

module.exports = withPWA(nextConfig);
