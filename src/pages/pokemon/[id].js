/*
import { useRouter } from 'next/router'
import useSWR from 'swr'
*/
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import { withTranslation } from '../../i18n';
import { getDetails } from '../../models/pokemonModel';
import PokemonDetails from '../../components/pokemon/PokemonDetails';
import usePokemon from '../../hooks/usePokemon';

/*
const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}
*/

const Pokemon = ({ pokemonId, initialPokemon }) => {
  const pokemon = usePokemon({ id: pokemonId }, initialPokemon);
  /*
  const { query } = useRouter()
  const { data, error } = useSWR(() => query.id && `/api/pokemon/${query.id}`, fetcher)

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>
*/
  return (
    <>
      <Head>
        <title>Pokedex - Home</title>
      </Head>
      <Container>
        <PokemonDetails pokemon={pokemon} />
      </Container>
    </>
  );
};

export async function getServerSideProps({ query: { id, lang } }) {
  const pokemon = await getDetails(id, lang);
  return {
    props: {
      pokemonId: id,
      initialPokemon: pokemon,
      namespacesRequired: ['common', 'pokemon'],
    },
  };
}

export default withTranslation('common')(Pokemon);
