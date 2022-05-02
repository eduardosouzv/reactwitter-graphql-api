import { JwtPayload } from 'jsonwebtoken';

export default interface Payload extends JwtPayload {
  id?: string;
  username?: string;
  iat?: number;
  exp?: number;
  token?: string;
}
