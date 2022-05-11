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
