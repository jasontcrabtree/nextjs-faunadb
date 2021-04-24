import { query as queryMethod } from 'faunadb';
import { faunaClient } from '../../lib/fauna';

export default async (req, res) => {
  if (req.method === 'GET') {
    const query = await faunaClient.query(
      queryMethod.Map(
        queryMethod.Paginate(
          queryMethod.Documents(queryMethod.Collection('shows'))
        ),
        queryMethod.Lambda((show) => queryMethod.Get(show))
      )
    );

    res.status(200).json({ data: query.data });
  }
};
