import { getListItems } from '../../../models/pokemonModel';

export default async function handler(req, res) {
  const list = await getListItems();
  res.status(200).json(list);
}
