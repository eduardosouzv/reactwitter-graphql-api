import { GraphQLSchema } from 'graphql';

import rootQuery from './rootQuery';
import rootMutation from './rootMutation';

export default new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
