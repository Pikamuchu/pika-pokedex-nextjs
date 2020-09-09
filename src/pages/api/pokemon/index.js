import { getListItems } from '../../../models/pokemonModel';

export default async function handler({ query }, res) {
  const list = await getListItems(query);
  res.status(200).json(list);
}
