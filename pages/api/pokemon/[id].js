import { getDetails } from '../../../models/pokemonModel';

export default async function pokemonHandler({ query: { id, name } }, res) {
  const details = await getDetails(query);

  if (details) {
    res.status(200).json(details);
  } else {
    res.status(404).json({ message: `User with id: ${id} not found.` });
  }
}
