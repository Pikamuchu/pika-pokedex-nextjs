import useSWR, { mutate } from 'swr';

import initialStore from '../libs/store';

import { isBrowser } from '../libs/utils';

const key = 'globalState';

if (isBrowser()) {
  const data = localStorage.getItem(key);
  mutate(key, data ? JSON.parse(data) : [], false);
}

export default function useStore() {
  return useSWR(key, {
    initialData: initialStore,
    onFailure() {
      localStorage.removeItem(key);
    },
    onSuccess(user) {
      localStorage.setItem(key, JSON.stringify(user));
    },
  });
}
