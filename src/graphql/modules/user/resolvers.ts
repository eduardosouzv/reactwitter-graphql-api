import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { SECRET } from '../../../utils/constants';

import Payload from '../../interfaces/Payload';
import { validateTokenInPrivateResolver } from '../../../utils/ensureAuth';

import UserController from '../../../controllers/UserController';

interface IUser {
  _id: string;
  username: string;
  password: string;
  token?: string;
}

export default {
  Query: {
    loginUser: UserController.loginUser,
    getCurrentUser: UserController.getCurrentUser,
  },
  Mutation: {
    registerUser: UserController.registerUser,
  },
};
