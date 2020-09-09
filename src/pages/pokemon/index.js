// import React, { useState, useCallback, useEffect } from 'react'
// import useSWR from 'swr'
import Head from 'next/head';
import { Container, Row, InputGroup, FormControl, Button } from 'react-bootstrap';

import { withTranslation } from '../../i18n';
import { getListItems } from '../../models/pokemonModel';
import PokemonList from '../../components/pokemon/PokemonList';

const Home = ({ pokemons, t }) => {
  /*
  const [pokemons, setPokemons] = useState(initialPokemons)
  const [search, setSearch] = useState("")

  const { data, error } = useSWR(`/api/pokemon?name=${search}`, fetcher)

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  useEffect(() => {
    if (data) {
      setPokemons(prev => [...prev, ...data])
    }
  }, [data])
*/
  return (
    <>
      <Head>
        <title>Pokedex - Home</title>
      </Head>
      <Container>
        <Row>
          <InputGroup className="mb-3">
            <FormControl placeholder={t('search-placeholder')} />
            <InputGroup.Append>
              <Button variant="outline-secondary">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
      </Container>
      <Container>
        <PokemonList pokemons={pokemons} />
      </Container>
    </>
  );
};

export async function getServerSideProps(context) {
  const pokemons = await getListItems(context?.query?.lang);
  return {
    props: {
      pokemons,
      namespacesRequired: ['common', 'pokemon'],
    },
  };
}

// const fetcher = (url) => fetch(url).then((res) => res.json())

export default withTranslation('common')(Home);
