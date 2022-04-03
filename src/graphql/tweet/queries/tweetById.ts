import { GraphQLString } from 'graphql';
import Tweet from '../../../models/Tweet';
import tweetTypeDef from '../tweetTypeDef';

export default {
  type: tweetTypeDef,
  args: {
    id: { type: GraphQLString },
  },
  resolve: (_: unknown, { id }: { id: string }) => Tweet.findById(id),
};
