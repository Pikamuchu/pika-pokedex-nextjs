import useSWR, { mutate } from 'swr';

import initialStore from '../libs/store';

import { isBrowser } from '../libs/utils';

const key = 'globalState';

const getInitialData = () => {
  if (isBrowser()) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initialStore;
  }
  return initialStore;
};

export default function useStore() {
  return useSWR(key, null, {
    fallbackData: getInitialData(),
    onError() {
      if (isBrowser()) localStorage.removeItem(key);
    },
    onSuccess(store) {
      if (isBrowser()) localStorage.setItem(key, JSON.stringify(store));
    },
  });
}

export const mutateStore = (data, revalidate) => {
  mutate(key, data ? JSON.parse(data) : {}, revalidate || false);
};
