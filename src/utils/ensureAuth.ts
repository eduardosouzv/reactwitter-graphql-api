import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { SECRET } from './constants';

import Payload from '../graphql/interfaces/Payload';

type IAuthRequest = Request & {
  headers: { authorization: string };
};

export function putTokenInContext({ req }: { req: IAuthRequest }) {
  try {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '').trim();
    const data = jwt.verify(token, SECRET) as Payload;

    return {
      ...data,
      token,
    } as Payload;
  } catch {
    return null;
  }
}
export function validateTokenInPrivateResolver(ctx: Payload) {
  try {
    const token = ctx.token || '';
    jwt.verify(token, SECRET);
  } catch (error) {
    throw new AuthenticationError('Invalid Token');
  }
  return ctx;
}
