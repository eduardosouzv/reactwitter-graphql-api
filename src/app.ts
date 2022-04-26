import 'dotenv/config';
import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { ensureAuth } from './utils/ensureAuth';

export function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ensureAuth,
  });
  server.listen().then(({ url }) => console.log(`running at ${url}`));
}
