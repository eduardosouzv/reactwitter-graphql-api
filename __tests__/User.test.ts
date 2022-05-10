import faker from '@faker-js/faker';
import mongoose from 'mongoose';
import request from 'supertest';
import server from '../src/app';

import { connectDatabase } from '../src/database';
import User from '../src/models/User';

describe('User', () => {
  beforeAll(async () => {
    await connectDatabase();
    await User.deleteMany({});
    await server.start();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
    await server.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create an user', async () => {
    const response = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
        mutation User {
          registerUser(username: "edaurdo", password: "1212") {
            token
          }
        }`,
      });

    expect(response.body.data.registerUser.token).toEqual(expect.any(String));
    expect(response.status).toBe(200);
  });

  it('should not create two users with same user', async () => {
    await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
        mutation User {
          registerUser(username: "edaurdo", password: "1212") {
            token
          }
        }`,
      });
    const response = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
        mutation User {
          registerUser(username: "edaurdo", password: "1212") {
            token
          }
        }`,
      });

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors?.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
  });

  it('should login with a user', async () => {
    const user = faker.name.firstName();
    await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
        mutation User {
          registerUser(username: "${user}", password: "strong@pass") {
            token
          }
        }`,
      });

    const response = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
        query {
          loginUser(username:"${user}" , password: "strong@pass") {
            token
            user {
              id
              name
            }
          }
        }`,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.loginUser).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: {
          id: expect.any(String),
          name: user,
        },
      })
    );
  });

  it('should create a user and return in getCurrentUser route', async () => {
    const user = faker.name.firstName();
    const userRequest = await request('http://localhost:4000/')
      .post('/')
      .send({
        query: `
        mutation User {
          registerUser(username: "${user}", password: "strong@pass") {
            token
          }
        }`,
      });
    const { token } = userRequest.body.data.registerUser;

    const response = await request('http://localhost:4000/')
      .post('/')
      .set('Authorization', token)
      .send({
        query: `
        query {
          getCurrentUser {
            id
            name
          }
        }`,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.getCurrentUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: user,
      })
    );
  });
});
