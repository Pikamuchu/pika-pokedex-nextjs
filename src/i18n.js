const { useTranslation, Trans } = require('next-i18next');
const { useRouter } = require('next/router');

// For compatibility with old code using Router from i18n
const Router = {
  push: (url) => {
    if (typeof window !== 'undefined') {
      const router = useRouter();
      return router.push(url);
    }
    return Promise.resolve(false);
  },
};

module.exports = {
  useTranslation,
  Trans,
  Router,
  useRouter,
  i18n: { language: 'en' }, // Fallback for SSR
};
