import useSWR from 'swr';

import initialStore from '../libs/store';

export default function useStore() {
  return useSWR("globalState", { initialData: initialStore });
}