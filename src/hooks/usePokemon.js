import useSWR from 'swr';

import { Router, i18n } from '../i18n';
import fetcher from '../libs/fetcher';
import { querySeparator } from '../libs/utils';

export default function usePokemon(query, initialData) {
  return useSWR(shouldFetch(query) ? createApiUrl(query) : null, fetcher, { initialData });
}

export const fetchPokemon = async (query) => {
  return fetcher(createApiUrl(query));
};

export const routePokemon = (query) => {
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
  let url = `/${lang}${query?.api ? '/api' : ''}/pokemon`;
  if (query?.id || query?.slug) {
    url += `/${query.id || query?.slug}`;
  }
  if (query?.searchTerm) {
    url += `?q=${query.searchTerm}`;
  }
  if (query?.type) {
    url += `${querySeparator(url)}type=${query.type}`;
  }
  return url;
};
