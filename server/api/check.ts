import type { IncomingMessage, ServerResponse } from 'http';

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method !== 'GET') return 'Must be get request';

  // @ts-ignore
  let user = null;
  // @ts-ignore
  if (req.user) {
    // @ts-ignore
    user = JSON.parse(req.user);
  }

  if (user?.uid) {
    res.statusCode = 200;
    res.end('This is a top secret message from the API');
  }
  res.statusCode = 400;
  res.end('Must be signed in to read secret message');
};
