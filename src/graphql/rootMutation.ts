import { GraphQLObjectType } from 'graphql';

import createTweet from './tweet/mutations/createTweet';

export default new GraphQLObjectType({
  name: 'rootMutation',
  fields: {
    createTweet,
  },
});
