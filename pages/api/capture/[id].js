import { getCaptures, updateCaptures, deleteCaptures } from '../../../src/models/captureModel';

export default async function handler({ query, method }, res) {
  switch (method) {
    case 'GET': {
      const captures = await getCaptures(query);
      res.status(200).json(captures);
      break;
    }
    case 'POST':
    case 'PUT':
      await updateCaptures(query);
      res.status(200).json(null);
      break;
    case 'DELETE':
      await deleteCaptures(query);
      res.status(200).json(null);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
