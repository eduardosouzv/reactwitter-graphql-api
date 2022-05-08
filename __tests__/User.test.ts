import mongoose from 'mongoose';
import request from 'supertest';
import server from '../src/app';

import { connectDatabase } from '../src/database';

describe('User', () => {
  beforeAll(async () => {
    await connectDatabase();
    await server.start();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.stop();
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
});
