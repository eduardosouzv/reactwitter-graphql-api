import { GraphQLList } from 'graphql';
import Tweet from '../../../models/Tweet';
import tweetTypeDef from '../tweetTypeDef';

const tweets = [
  {
    _id: '1',
    author: 'eduardo',
    content: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
  },
  {
    _id: '2',
    author: 'souza',
    content: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
  },
  {
    _id: '3',
    author: 'matheus',
    content: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
  },
];

export default {
  type: new GraphQLList(tweetTypeDef),
  resolve: () => Tweet.find(),
};
