import { query as queryMethod } from 'faunadb';
import { faunaClient } from '../../lib/fauna';

export default async (req, res) => {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    const query = await faunaClient.query(
      queryMethod.Create(queryMethod.Collection('shows'), {
        data: { title: body.title, watched: false },
      })
    );

    res.status(200).json({ data: query });
  }
};
