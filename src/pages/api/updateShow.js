import { query as queryMethod } from 'faunadb';
import { faunaClient } from '../../lib/fauna';

export default async (req, res) => {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    const query = await faunaClient.query(
      queryMethod.Update(
        queryMethod.Select(
          ['ref'],
          queryMethod.Get(
            queryMethod.Match(queryMethod.Index('shows_by_title'), body.title)
          )
        ),
        {
          data: {
            watched: body.watched,
          },
        }
      )
    );

    res.status(200).json({ data: query });
  }
};
