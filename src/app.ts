import 'dotenv/config';
import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { putTokenInContext } from './utils/ensureAuth';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: putTokenInContext,
});

export default {
  start: async () => {
    return server.listen();
  },

  stop: () => {
    return server.stop();
  },
};
