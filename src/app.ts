import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

export function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => console.log(`running at ${url}`));
}
