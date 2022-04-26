import jwt from 'jsonwebtoken';

import { SECRET } from './constants';

type IAuthRequest = Request & {
  headers: { authorization: string };
};

export function ensureAuth({ req }: { req: IAuthRequest }) {
  const { authorization } = req.headers;

  if (!authorization) {
    return null;
  }

  const token = authorization.replace('Bearer ', '').trim();

  try {
    const data = jwt.verify(token, SECRET);
    return data;
  } catch {
    return null;
  }
}
