const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ca'],
  },
  localePath: path.resolve('./public/static/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
