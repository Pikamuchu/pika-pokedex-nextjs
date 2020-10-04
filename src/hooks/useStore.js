import useSWR, { mutate } from 'swr';

import initialStore from '../libs/store';

import { isBrowser } from '../libs/utils';

const key = 'globalState';

if (isBrowser()) {
  const data = localStorage.getItem(key);
  mutateStore(data);
}

export default function useStore() {
  return useSWR(key, {
    initialData: initialStore,
    onFailure() {
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
