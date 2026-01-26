# Migration Guide: Next.js 10 to Next.js 15

This document outlines the changes made during the upgrade from Next.js 10 to Next.js 15.

## Summary of Changes

### Major Version Updates
- **Next.js**: 10.0.5 → 15.3.8
- **React**: 16.13.1 → 18.3.1
- **Bootstrap**: 4.5.2 → 5.3.3
- **React Bootstrap**: 1.3.0 → 2.10.6
- **SWR**: 0.1.18 → 2.2.5
- **next-i18next**: 7.0.1 → 15.3.1
- **Node.js**: 12 → 18+ (required)

### Testing Stack Migration
- Replaced **Enzyme** with **React Testing Library**
- Updated Jest to v29 with `jsdom` environment
- Removed deprecated `babel-eslint`, added `@babel/eslint-parser`

## Breaking Changes & Migrations

### 1. i18n Configuration

**Before (next.config.js):**
```javascript
const { nextI18NextRewrites } = require('next-i18next/rewrites');

module.exports = withPWA({
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: { localeSubpaths },
});
```

**After:**
```javascript
// next.config.js
const { i18n } = require('./next-i18next.config');
module.exports = withPWA({ i18n });

// next-i18next.config.js (new file)
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ca'],
  },
  localePath: path.resolve('./public/static/locales'),
};
```

### 2. Page Components with i18n

**Before:**
```javascript
import { withTranslation } from '../../src/i18n';

const Page = ({ t }) => {
  return <div>{t('key')}</div>;
};

Page.defaultProps = {
  i18nNamespaces: ['common', 'namespace']
};

export default withTranslation('namespace')(Page);
```

**After:**
```javascript
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Page = () => {
  const { t } = useTranslation('namespace');
  return <div>{t('key')}</div>;
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'namespace'])),
    },
  };
};

export default Page;
```

### 3. Router Usage

**Before:**
```javascript
import { Router } from '../src/i18n';
Router.push('/path');
```

**After:**
```javascript
import { useRouter } from 'next/router';

const Component = () => {
  const router = useRouter();
  router.push('/path');
};
```

### 4. SWR API Changes

**Before:**
```javascript
useSWR(key, fetcher, { initialData: data });
```

**After:**
```javascript
useSWR(key, fetcher, { fallbackData: data });
```

### 5. App Component (_app.js)

**Before:**
```javascript
import App from 'next/app';
import { appWithTranslation, Router } from '../src/i18n';

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  // Custom logic for i18n namespaces
  return { ...appProps, pageProps: { namespacesRequired: [...] } };
};

export default appWithTranslation(MyApp);
```

**After:**
```javascript
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// No getInitialProps needed - handled by next-i18next
export default appWithTranslation(MyApp);
```

### 6. PWA Configuration

**Before:**
```javascript
const withPWA = require('next-pwa');
module.exports = withPWA({
  pwa: { dest: 'public' }
});
```

**After:**
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});
module.exports = withPWA(nextConfig);
```

### 7. Bootstrap 5 Component Changes

Bootstrap 5 has several API changes. Notable ones:

- Form controls: `<Form.Control>` API slightly changed
- Utilities: Some class names updated (e.g., `ml-*` → `ms-*`, `mr-*` → `me-*`)
- Removed jQuery dependency
- Updated color system

Refer to [Bootstrap 5 Migration Guide](https://getbootstrap.com/docs/5.3/migration/) for details.

### 8. Testing with React Testing Library

**Before (Enzyme):**
```javascript
import { shallow } from 'enzyme';

it('test', () => {
  const wrapper = shallow(<Component />);
  expect(wrapper).toBeDefined();
});
```

**After (React Testing Library):**
```javascript
import { render, screen } from '@testing-library/react';

it('test', () => {
  render(<Component />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});
```

## Configuration Files Changed

### Modified Files
- `package.json` - All dependency versions
- `next.config.js` - i18n config, PWA setup
- `.eslintrc.json` - Parser and rules
- `jest.config.js` - Test environment and transforms
- `jest.setup.js` - Mocks and test utilities
- `pages/_app.js` - Removed getInitialProps
- `src/i18n.js` - Simplified to re-export next-i18next
- `Dockerfile` - Node 18 Alpine

### New Files
- `next-i18next.config.js` - Centralized i18n configuration

## Post-Migration Steps

1. **Install dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Update all page components:**
   - Replace `withTranslation` HOC with `useTranslation` hook
   - Add `serverSideTranslations` to all `getServerSideProps`
   - Update namespace declarations

3. **Update component imports:**
   - Replace `src/i18n` imports with `next-i18next` or `next/router`
   - Update Bootstrap component usage for v5 API

4. **Update tests:**
   - Replace Enzyme with React Testing Library
   - Update test assertions and queries

5. **Test thoroughly:**
   - Test all pages in all locales
   - Verify PWA functionality
   - Run full test suite
   - Test SSR rendering

6. **Build and verify:**
   ```bash
   npm run build
   npm start
   ```

## Known Issues & Considerations

1. **Bootstrap 5 Breaking Changes**: Review all Bootstrap components for API changes
2. **React 18 Automatic Batching**: State updates are now automatically batched
3. **Strict Mode**: Next.js 15 enables React Strict Mode by default
4. **Node.js Version**: Minimum Node.js 18.17 required

## Resources

- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading)
- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [next-i18next Documentation](https://github.com/i18next/next-i18next)
- [SWR 2.0 Migration](https://swr.vercel.app/docs/advanced/migration)
- [Bootstrap 5 Migration](https://getbootstrap.com/docs/5.3/migration/)
