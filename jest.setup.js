import '@testing-library/jest-dom';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    locale: 'en',
    locales: ['en', 'es', 'ca'],
    defaultLocale: 'en',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  })),
}));

// Mock next-i18next
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
  withTranslation: () => (Component) => {
    const t = (key) => key;
    Component.defaultProps = { ...Component.defaultProps, t };
    return Component;
  },
  Trans: ({ children }) => children,
  serverSideTranslations: jest.fn(() => Promise.resolve({ _nextI18Next: { initialLocale: 'en' } })),
}));

// Mock src/i18n module
jest.mock('./src/i18n', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' },
  }),
  withTranslation: () => (Component) => {
    const t = (key) => key;
    Component.defaultProps = { ...Component.defaultProps, t };
    return Component;
  },
  Router: {
    push: jest.fn(() => Promise.resolve(true)),
  },
  useRouter: jest.fn(() => ({
    locale: 'en',
    push: jest.fn(),
  })),
  i18n: { language: 'en' },
}));

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};

