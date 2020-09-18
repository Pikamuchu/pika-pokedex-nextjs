import { getPokemons } from '../../../src/models/pokemonModel';

export default async function handler({ query }, res) {
  const pokemons = await getPokemons(query);
  res.status(200).json(pokemons);
}
