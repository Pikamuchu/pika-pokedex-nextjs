import useSWR from 'swr';

import fetch from '../libs/fetcher';

function usePokemon(query, initialData) {
  const id = query?.id ?? '';
  const { data } = useSWR(`/api/pokemon/${id}`, fetch, { initialData });
  return data;
}

export default usePokemon;
