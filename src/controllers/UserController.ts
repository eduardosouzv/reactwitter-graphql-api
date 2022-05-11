import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { SECRET } from '../utils/constants';
import Payload from '../graphql/interfaces/Payload';
import { validateTokenInPrivateResolver } from '../utils/ensureAuth';

interface IUser {
  _id: string;
  username: string;
  password: string;
  token?: string;
}

class UserController {
  async authenticate(parent: unknown, args: IUser, context: Payload) {
    const { username, password } = args;

    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      throw new Error('401');
    }

    const isValidPassword = await bcrypt.compare(password, foundUser.password);
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
        name: username,
      },
      token,
    };
  }

  async showCurrent(parent: unknown, args: unknown, context: Payload) {
    validateTokenInPrivateResolver(context);
    const { id, username } = context;

    return {
      id,
      name: username,
    };
  }

  async store(parent: unknown, args: IUser, context: Payload) {
    const { username, password } = args;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user: IUser = await User.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET, {
      expiresIn: '1d',
    });

    return {
      user: {
        id: String(user._id),
        name: user.username,
      },
      token,
    };
  }
}

export default new UserController();
