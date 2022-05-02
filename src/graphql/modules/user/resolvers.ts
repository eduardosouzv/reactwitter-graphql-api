import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { SECRET } from '../../../utils/constants';

import Payload from '../../interfaces/Payload';
import { AuthenticationError } from 'apollo-server';
import { validateTokenInPrivateResolver } from '../../../utils/ensureAuth';

interface IUser {
  _id: string;
  username: string;
  password: string;
  token?: string;
}

export default {
  Query: {
    loginUser: async (_: unknown, args: IUser) => {
      const { username, password } = args;

      const foundUser = await User.findOne({ username });
      if (!foundUser) {
        throw new Error('401');
      }

      const isValidPassword = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (!isValidPassword) {
        throw new Error('401');
      }

      const token = jwt.sign(
        { id: foundUser._id, username: foundUser.username },
        SECRET,
        {
          expiresIn: '1d',
        }
      );

      return {
        user: {
          id: String(foundUser._id),
          username,
        },
        token,
      };
    },
    getCurrentUser: async (_: unknown, args: unknown, data: Payload) => {
      validateTokenInPrivateResolver(data);
      const { id, username } = data;

      return {
        id,
        username,
      };
    },
  },
  Mutation: {
    registerUser: async (_: unknown, args: IUser) => {
      const { username, password } = args;

      const hashedPassword = bcrypt.hashSync(password, 8);

      const user: IUser = await User.create({
        username,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { id: user._id, username: user.username },
        SECRET,
        {
          expiresIn: '1d',
        }
      );

      return {
        id: user._id,
        ...user,
        token,
      };
    },
  },
};
