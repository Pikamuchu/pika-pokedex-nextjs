# Pikadex - AI Coding Instructions

## Project Overview
Pikadex is a Pokemon Pokedex PWA built with Next.js 15, React 18, and Bootstrap 5. It features SSR hybrid rendering, built-in i18n routing (en/es/ca), and an interactive capture game using anime.js.

## Architecture

### Rendering Strategy
- **Hybrid SSR**: All pages use `getServerSideProps` (no static generation)
- **Client-side caching**: SWR for data fetching with revalidation
- **API Routes**: Serverless functions in `pages/api/` proxy to PokeAPI
- **Data flow**: Page SSR → Model layer → PokeAPI → SWR cache → Component

### Key Directories
- `pages/`: Next.js pages + API routes (follows Next.js conventions)
- `src/components/`: Presentational components organized by domain (capture, home, pokemon, layout)
- `src/models/`: Data layer with PokeAPI integration (`pokemonModel.js`, `captureModel.js`)
- `src/hooks/`: Custom hooks (`usePokemon`, `useCapture`, `useStore`, `useDebounce`)
- `src/libs/`: Utilities (fetcher, tracker, store, spanner)
- `public/static/locales/`: i18n JSON files by language

## Critical Patterns

### Data Fetching Pattern
All pages follow this structure:
```javascript
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export const getServerSideProps = async ({ query, locale }) => {
  const data = await getModelData(query);
  return { 
    props: { 
      initialData: { query, data },
      ...(await serverSideTranslations(locale, ['common', 'namespace']))
    } 
  };
};

const Page = ({ initialData }) => {
  const { t } = useTranslation('namespace');
  const { data } = usePokemon({ id: initialData?.query?.id }, initialData?.data);
  // Component uses SWR-cached data with fallbackData
};
```

### API Route Pattern
API routes in `pages/api/` delegate to model layer:
```javascript
import { getModelData } from '../../../src/models/model';

export default async function handler({ query }, res) {
  const result = await getModelData(query);
  result ? res.status(200).json(result) : res.status(404).json({ message: 'Not found' });
}
```

### Internationalization
- Use `useTranslation('namespace')` hook in components
- Use `serverSideTranslations(locale, ['namespace'])` in `getServerSideProps`
- Import from `next-i18next` for hooks and utilities
- Import from `next/router` for `useRouter` hook
- Translation files: `public/static/locales/{en,es,ca}/*.json`
- Config: `next-i18next.config.js` defines locales and paths

### State Management
- **Global state**: `useStore()` hook with localStorage sync via SWR
- **API state**: SWR 2 for server data with `fallbackData` from SSR (renamed from `initialData`)
- Store structure: `{ loading, capturedPokemons }`
- Mutate store: `mutateStore(data, revalidate)`

### Capture Game Architecture
Game in `src/components/capture/game/` uses modular helpers:
- `GameStateHelpers`: Game state machine
- `GameElementsHelpers`: DOM/canvas element creation
- `GameActionsHelpers`: User action handlers
- `GameEventsHelpers`: Event binding (Hammer.js for touch)
- `GameEffectsHelpers`: anime.js animations
- Entry point: `CaptureGame.js` orchestrates all helpers

## Development Workflow

### Commands
```bash
npm run dev       # Development server (port 3000)
npm run build     # Production build
npm start         # Production server
npm test          # Jest tests
npm run lint      # ESLint with --fix
npm run format    # Prettier format
./pika [command]  # Bash wrapper for above + Docker commands
```

### Adding New Pages
1. Create page in `pages/` with `getServerSideProps`
2. Add `serverSideTranslations(locale, ['namespaces'])` to props
3. Use `useTranslation('namespace')` hook in component
4. Add i18n files to `public/static/locales/{lang}/`
5. Use `useRouter` from `next/router` for routing

### Adding API Endpoints
1. Create route in `pages/api/`
2. Import model function from `src/models/`
3. Follow handler pattern (see API Route Pattern above)

### Model Layer Conventions
- Models in `src/models/` handle PokeAPI integration
- Use `pokedex-promise-v2` library (instance: `P`)
- Static data in `src/models/data/*.json` (fallbacks, search index)
- Return normalized data structure (see `pokemonModel.js` for schema)

## Configuration Files

### next.config.js
- PWA config via `next-pwa` v5
- React Strict Mode enabled
- Built-in i18n from `next-i18next.config.js`
- Dev source maps enabled

### next-i18next.config.js
- Defines supported locales: `['en', 'es', 'ca']`
- Sets `localePath` for translation files
- Enables hot-reload in development

### preferences.js
Central config for:
- `pageSize: 20` (pagination)
- `availableLanguages: ['en', 'es', 'ca']`
- `pokemonImageUrlPrefix`: CDN URL

### ESLint
- Airbnb style guide with React plugins
- `@babel/eslint-parser` (replaces deprecated `babel-eslint`)
- Next.js core-web-vitals rules included
- JSX allowed in `.js` files
- PropTypes warnings (not errors)
- No React import required (Next.js auto-imports)

## Testing
- Jest 29 + React Testing Library
- Tests in `__tests__/`
- Test data: `__tests__/data/pokemonsData.json`
- Mocks for `next/router` and `next-i18next` in `jest.setup.js`
- Run with `yarn test` (coverage enabled)

## Dependencies to Note
- `next@15.1.3`: React framework with App Router support
- `react@18.3.1` / `react-dom@18.3.1`: UI library
- `next-i18next@15.3.1`: i18n integration with built-in routing
- `swr@2.2.5`: Data fetching/caching (note: `initialData` → `fallbackData`)
- `bootstrap@5.3.3` / `react-bootstrap@2.10.6`: Bootstrap 5 components
- `pokedex-promise-v2@4.1.1`: PokeAPI client
- `animejs@3.2.1`: Capture game animations
- `hammerjs@2.0.8`: Touch gesture handling
- `react-autosuggest@10.1.0`: Search component

## Common Gotchas
- Use `useRouter` from `next/router` (built-in i18n support in Next.js 15)
- Always add `serverSideTranslations()` to `getServerSideProps` for i18n pages
- SWR 2: Use `fallbackData` instead of `initialData` prop
- Bootstrap 5: Some component APIs changed from v4 (check docs)
- Store uses SWR key `'globalState'` - don't create conflicting keys
- Pokemon data from PokeAPI requires normalization (see `pokemonModel.js`)
- Custom Pokemon data in `src/models/data/customPokemonsData.json` supplements PokeAPI
- Node.js 18+ required for Next.js 15
