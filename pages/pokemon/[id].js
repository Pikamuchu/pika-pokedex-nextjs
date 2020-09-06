/*
import { useRouter } from 'next/router'
import useSWR from 'swr'
*/
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import { withTranslation } from '../../i18n';
import { getDetails } from '../../models/pokemonModel';
import Layout from '../../components/Layout';
import PokemonDetails from '../../components/PokemonDetails';

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

const Pokemon = ({ pokemon }) => {
  /*
  const { query } = useRouter()
  const { data, error } = useSWR(() => query.id && `/api/pokemon/${query.id}`, fetcher)

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>
*/
  return (
    <Layout>
      <Head>
        <title>Pokedex - Home</title>
      </Head>
      <Container>
        <PokemonDetails pokemon={pokemon} />
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({ query: { id, lang } }) {
  const pokemon = await getDetails(id, lang);
  return {
    props: {
      pokemon,
      namespacesRequired: ['common', 'pokemon'],
    },
  };
}

/*
const fetcher = (url) => fetch(url).then((res) => res.json())
*/

export default withTranslation('common')(Pokemon);
