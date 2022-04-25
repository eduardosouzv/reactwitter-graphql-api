import Tweet from '../../../models/Tweet';

interface ITweet {
  author: String;
  content: String;
}

export default {
  Query: {
    tweets: async () => await Tweet.find().sort({ _id: -1 }),
    tweetById: async (_: unknown, { id }: { id: string }) =>
      await Tweet.findById(id),
  },
  Mutation: {
    createTweet: async (_: unknown, args: ITweet) => await Tweet.create(args),
  },
};
