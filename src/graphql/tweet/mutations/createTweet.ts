import { GraphQLString } from 'graphql';
import Tweet from '../../../models/Tweet';
import tweetTypeDef from '../tweetTypeDef';

interface ITweet {
  author: String;
  content: String;
}

export default {
  type: tweetTypeDef,
  args: {
    author: { type: GraphQLString },
    content: { type: GraphQLString },
  },
  resolve: (_: unknown, args: ITweet) => Tweet.create(args),
};
