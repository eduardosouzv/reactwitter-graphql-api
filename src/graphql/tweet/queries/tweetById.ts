import { GraphQLString } from 'graphql';
import tweetTypeDef from '../tweetTypeDef';

export default {
  type: tweetTypeDef,
  args: {
    id: { type: GraphQLString },
  },
  resolve: (_: unknown, { id }: { id: string }) => ({
    _id: '1',
    author: 'eduardo',
    content: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
  }),
};
