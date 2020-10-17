import { getCaptures, updateCaptures } from '../../../src/models/captureModel';

export default async function handler({ query, method }, res) {
  switch (method) {
    case 'GET': {
      const captures = await getCaptures(query);
      res.status(200).json(captures);
      break;
    }
    case 'POST':
      await updateCaptures(query);
      res.status(200).json(null);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
