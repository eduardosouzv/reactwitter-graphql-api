import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'tweet',
  fields: {
    _id: { type: GraphQLString },
    author: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});
