import request from 'supertest';
import { faker } from '@faker-js/faker';

import { connectDatabase } from '../src/database';
import server from '../src/app';
import Tweet from '../src/models/Tweet';
import mongoose from 'mongoose';
import User from '../src/models/User';

describe('Post', () => {
  beforeAll(async () => {
    await connectDatabase();
    await Tweet.deleteMany({});
    await User.deleteMany({});
    await server.start();
  });

  afterAll(async () => {
    await Tweet.deleteMany({});
    await mongoose.connection.close();
    await server.stop();
  });

  beforeEach(async () => {
    await Tweet.deleteMany({});
  });

  it('should create new post', async () => {
    const userResponse = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
        mutation User {
          registerUser(username: "user_making_post", password: "strong@pass123") {
            user {
              id
            }
          }
        }
        `,
      });
    const userId = userResponse.body.data.registerUser.user.id;

    const createPostRequest = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
        mutation {
          createTweet(authorId: "${userId}", content: "test content") {
            id
          }
        }`,
      });

    expect(createPostRequest.status).toBe(200);
    expect(createPostRequest.body.data.createTweet.id).toEqual(
      expect.any(String)
    );
  });

  it('should list all created posts', async () => {
    const fakeUsername = faker.name.findName();

    const userResponse = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
      mutation User {
        registerUser(username: "${fakeUsername}", password: "strong@pass123") {
          user {
            id
          }
        }
      }
      `,
      });
    const userId = userResponse.body.data.registerUser.user.id;

    await Promise.all([
      request('http://localhost:4000/')
        .post('/')
        .send({
          query: `
            mutation {
              createTweet(authorId: "${userId}", content: "test content 1") {
                id
              }
            }`,
        }),
      request('http://localhost:4000/')
        .post('/')
        .send({
          query: `
            mutation {
              createTweet(authorId: "${userId}", content: "test content 2") {
                id
              }
            }`,
        }),
    ]);

    const response = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
          query {
            tweets {
              id
              content
              author {
                id
                username
              }
            }
          }`,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.tweets.length).toBeGreaterThanOrEqual(2);
    expect(response.body.data.tweets).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          content: 'test content 1',
          author: expect.objectContaining({
            id: expect.any(String),
            username: fakeUsername,
          }),
        },
        {
          id: expect.any(String),
          content: 'test content 2',
          author: expect.objectContaining({
            id: expect.any(String),
            username: fakeUsername,
          }),
        },
      ])
    );
  });

  it('should return a post by id', async () => {
    const fakeUsername = faker.name.findName();

    const userResponse = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
      mutation User {
        registerUser(username: "${fakeUsername}", password: "strong@pass123") {
          user {
            id
          }
        }
      }
      `,
      });
    const userId = userResponse.body.data.registerUser.user.id;

    const createPostRequest = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
          mutation {
            createTweet(authorId: "${userId}", content: "test content") {
              id
            }
          }`,
      });

    const tweetId = createPostRequest.body.data.createTweet.id;

    const response = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
          query {
            tweetById(id: "${tweetId}") {
              id
              content
              author {
                id
                username
              }
            }
          }`,
      });

    expect(response.body.data.tweetById).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        content: 'test content',
        author: expect.objectContaining({
          id: expect.any(String),
          username: fakeUsername,
        }),
      })
    );
  });
});
