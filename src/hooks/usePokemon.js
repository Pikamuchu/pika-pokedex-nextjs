import useSWR from 'swr';

import { i18n } from '../i18n';
import fetcher from '../libs/fetcher';
import { querySeparator } from '../libs/utils';

export default function usePokemon(query, initialData) {
  return useSWR(shouldFetch(query) ? createUrl(query) : null, fetcher, { initialData });
}

export async function fetchPokemon(query) {
  return fetcher(createUrl(query));
}

const shouldFetch = (query) => {
  return query && (query.id || query.search);
};

const createUrl = (query) => {
  const lang = i18n.language ?? 'en';
  let url = `/${lang}/api/pokemon`;
  if (query?.id) {
    url += `/${query.id}`;
  }
  if (query?.search) {
    url += `?q=${query.search}`;
  }
  if (query?.type) {
    url += `${querySeparator(url)}type=${query.type}`;
  }
  return url;
};
