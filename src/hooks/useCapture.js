import useSWR from 'swr';

import { Router, i18n } from '../i18n';
import fetcher from '../libs/fetcher';
import postData from '../libs/postData';
import { isBrowser } from '../libs/utils';

export default function useCapture(query) {
  const key = shouldFetch(query) ? createApiUrl(query) : null;
  return useSWR(key, fetcher, {
    initialData: getInitialData(key),
    onFailure() {
      if (isBrowser()) localStorage.removeItem(key);
    },
    onSuccess(captures) {
      if (isBrowser()) localStorage.setItem(key, JSON.stringify(captures));
    },
  });
}

export const fetchCapture = async (query) => {
  return fetcher(createApiUrl(query));
};

export const postCapture = async (data, mutate, revalidate) => {
  mutate(data, false) // local mutate without revalidation
  await postData(createApiUrl(), data) // POST request
  revalidate() // revalidate
};

export const routeCapture = (query) => {
  Router.push(createUrl(query)).then(() => window.scrollTo(0, 0));
};

const getInitialData = (key) => {
  let initialData;
  if (isBrowser()) initialData = localStorage.getItem(key);
  return initialData ?? [];
}

const shouldFetch = (query) => {
  return query && (query.id || query.ids);
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
