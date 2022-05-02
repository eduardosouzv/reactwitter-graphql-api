import Tweet from '../../../models/Tweet';
import { validateTokenInPrivateResolver } from '../../../utils/ensureAuth';

interface ITweet {
  author: String;
  content: String;
}

export default {
  Query: {
    tweets: async (_: unknown, args: unknown, ctx: { id: string }) => {
      validateTokenInPrivateResolver(ctx);

      return await Tweet.find().sort({ _id: -1 });
    },
    tweetById: async (
      _: unknown,
      { id }: { id: string },
      ctx: { id: string }
    ) => {
      validateTokenInPrivateResolver(ctx);

      return await Tweet.findById(id);
    },
  },
  Mutation: {
    createTweet: async (_: unknown, args: ITweet, ctx: { id: string }) => {
      validateTokenInPrivateResolver(ctx);

      return await Tweet.create(args);
    },
  },
};
