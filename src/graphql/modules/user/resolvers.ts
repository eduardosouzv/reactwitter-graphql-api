import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { SECRET } from '../../../utils/constants';

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

      const token = jwt.sign({ id: foundUser._id }, SECRET, {
        expiresIn: '1d',
      });

      return token;
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

      const token = jwt.sign({ id: user._id }, SECRET, {
        expiresIn: '1d',
      });

      return {
        user,
        token,
      };
    },
  },
};
