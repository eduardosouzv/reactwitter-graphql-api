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
});
