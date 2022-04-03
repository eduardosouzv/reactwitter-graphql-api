import { GraphQLObjectType } from 'graphql';

import tweets from './tweet/queries/tweets';
import tweetById from './tweet/queries/tweetById';

export default new GraphQLObjectType({
  name: 'rootQuery',
  fields: {
    tweets,
    tweetById,
  },
});
