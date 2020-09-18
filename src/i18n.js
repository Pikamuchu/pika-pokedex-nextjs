const path = require('path');
const NextI18Next = require('next-i18next').default;
const NextConfig = require('next/config').default();

module.exports = new NextI18Next({
  otherLanguages: ['es', 'ca'],
  localeSubpaths: NextConfig?.publicRuntimeConfig?.localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
});
