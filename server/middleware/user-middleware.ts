import type { IncomingMessage, ServerResponse } from 'http';
import { useCookie } from 'h3';

export default async (req: IncomingMessage, res: ServerResponse) => {
  // @ts-ignore
  const userCookie = useCookie(req, 'userCookie');

  // @ts-ignore
  req.user = userCookie;
};
