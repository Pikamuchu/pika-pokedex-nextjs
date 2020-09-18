import { getPokemonDetails } from '../../../src/models/pokemonModel';

export default async function handler({ query }, res) {
  const details = await getPokemonDetails(query);
  if (details) {
    res.status(200).json(details);
  } else {
    res.status(404).json({ message: `User with id: ${query?.id} not found.` });
  }
}
