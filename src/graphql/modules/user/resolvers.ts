import UserController from '../../../controllers/UserController';

interface IUser {
  _id: string;
  username: string;
  password: string;
  token?: string;
}

export default {
  Query: {
    loginUser: UserController.authenticate,
    getCurrentUser: UserController.showCurrent,
  },
  Mutation: {
    registerUser: UserController.store,
  },
};
