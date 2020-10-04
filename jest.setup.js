/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import 'jsdom-global/register';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Mock react-i18next
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: {},
    },
  },
});

// Mock i18n
jest.mock('./src/i18n', () => {
  const t = (key, params) => {
    if (key === 'key.with.params') {
      return `key.with.params.${params?.param}`;
    }
    return key;
  };
  return {
    useTranslation: () => {
      return {
        t,
        i18n: {
          language: 'en',
          changeLanguage: jest.fn().mockImplementation((lang) => console.log(lang)),
        },
      };
    },
    withTranslation: () => (Component) => {
      Component.defaultProps = { ...Component.defaultProps, t };
      return Component;
    },
  };
});

configure({ adapter: new Adapter() });
