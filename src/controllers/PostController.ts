import Payload from '../graphql/interfaces/Payload';
import Tweet from '../models/Tweet';

interface ITweet {
  authorId: String;
  content: String;
}

class PostController {
  async index() {
    const tweets = await Tweet.find().populate('author').sort({ _id: -1 });

    return tweets.map((tweet) => ({
      id: String(tweet._id),
      author: {
        id: String(tweet.author._id),
        username: tweet.author.username,
      },
      content: tweet.content,
    }));
  }

  async show(parent: unknown, { id }: { id: string }, context: Payload) {
    try {
      const tweet = await Tweet.findById(id).populate('author');

      return {
        id: String(tweet._id),
        author: {
          id: String(tweet.author._id),
          username: tweet.author.username,
        },
        content: tweet.content,
      };
    } catch {
      return null;
    }
  }

  async store(_: unknown, args: ITweet) {
    const { authorId: author, content } = args;
    const newTweet = await Tweet.create({ author, content });
    return newTweet;
  }
}

export default new PostController();
