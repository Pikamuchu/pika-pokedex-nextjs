import useSWR from 'swr';

import { Router, i18n } from '../i18n';
import fetcher from '../libs/fetcher';

export default function useCapture(query, initialData) {
  return useSWR(shouldFetch(query) ? createApiUrl(query) : null, fetcher, { initialData });
}

export const fetchCapture = async (query) => {
  return fetcher(createApiUrl(query));
};

export const routeCapture = (query) => {
  Router.push(createUrl(query)).then(() => window.scrollTo(0, 0));
};

const shouldFetch = (query) => {
  return query && (query.id || query.searchTerm);
};

const createApiUrl = (query) => {
  return createUrl({ api: true, ...query });
};

const createUrl = (query) => {
  const lang = i18n.language ?? 'en';
  let url = `/${lang}${query?.api ? '/api' : ''}/capture`;
  if (query?.id || query?.slug) {
    url += `/${query.id || query?.slug}`;
  }
  return url;
};
