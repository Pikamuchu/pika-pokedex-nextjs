import useSWR from 'swr';

import { Router, i18n } from '../i18n';
import fetcher from '../libs/fetcher';
import { querySeparator } from '../libs/utils';

export default function usePokemon(query, initialData) {
  const response = useSWR(shouldFetch(query) ? createApiUrl(query) : null, fetcher, { initialData });
  return response;
}

export const fetchPokemon = async (query) => {
  return fetcher(createApiUrl(query));
};

export const routePokemon = (query) => {
  Router.push(createUrl(query)).then(() => window.scrollTo(0, 0));
};

const shouldFetch = (query) => {
  return query && (query.id || query.searchTerm || query.pageIndex);
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
    url += `${querySeparator(url)}q=${query.searchTerm}`;
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
