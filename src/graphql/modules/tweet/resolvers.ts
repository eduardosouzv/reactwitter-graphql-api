import PostController from '../../../controllers/PostController';

export default {
  Query: {
    tweets: PostController.index,
    tweetById: PostController.show,
  },
  Mutation: {
    createTweet: PostController.store,
  },
};
