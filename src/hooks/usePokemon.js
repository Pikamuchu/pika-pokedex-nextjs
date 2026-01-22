import useSWR from 'swr';
import Router from 'next/router';

import fetcher from '../libs/fetcher';
import { querySeparator } from '../libs/utils';

export default function usePokemon(query, initialData) {
  const response = useSWR(shouldFetch(query) ? createApiUrl(query) : null, fetcher, { fallbackData: initialData });
  return response;
}

export const fetchPokemon = async (query) => {
  return fetcher(createApiUrl(query));
};

export const routePokemon = (query) => {
  if (typeof window !== 'undefined') {
    return Router.push(createUrl(query));
  }
  return Promise.resolve(false);
};

const shouldFetch = (query) => {
  return query && (query.id || query.ids?.length || query.q || query.searchTerm || query.pageIndex || query.listType);
};

const createApiUrl = (query) => {
  return createUrl({ api: true, ...query });
};

const createUrl = (query) => {
  const lang = (typeof window !== 'undefined' && window.location.pathname.split('/')[1]) || 'en';
  let url = query?.api ? '/api/pokemon' : `/${lang}/pokemon`;
  if (query?.id || query?.slug) {
    url += `/${query.id || query?.slug}`;
  }
  if (query?.ids && query.ids.length > 0) {
    url += `${querySeparator(url)}ids=${query.ids.join(',')}`;
  }
  if (query?.q || query?.searchTerm) {
    url += `${querySeparator(url)}q=${query.q || query.searchTerm}`;
  }
  if (query?.listType) {
    url += `${querySeparator(url)}listType=${query.listType}`;
  }
  if (query?.limit) {
    url += `${querySeparator(url)}limit=${query.limit}`;
  }
  if (query?.offset) {
    url += `${querySeparator(url)}offset=${query.offset}`;
  }
  if (query?.pageIndex) {
    url += `${querySeparator(url)}pageIndex=${query.pageIndex}`;
  }
  if (query?.pageSize) {
    url += `${querySeparator(url)}pageSize=${query.pageSize}`;
  }
  return url;
};
