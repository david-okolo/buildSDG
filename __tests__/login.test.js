import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../src/app';
import { sequelize, User } from '../src/app/models';

describe('POST /login Tests', () => {
  const route = '/login';

  beforeAll(async () => {
    // clear the tables before we start running tests
    await sequelize.truncate();
    // create an entry for the user we're testing against
    await User.create({
      username: '09076421860',
      password: '$2b$10$rnlk67ws3O3AIH.B5x7SluPrfy.2/ASTDYTCslb8.9r4LAbrDzipG',
      name: 'Jack Rich'
    });
  });

  afterAll(async () => {
    await sequelize.truncate();
  });

  /**
   * TODO: Test to check for a bad request reply from server
   */

  it('correctly signs in user', async () => {
    const { body, status } = await request(app).post(route).send({
      username: '09076421860',
      password: 'password'
    });
    expect(status).toBe(200);
    // expect(await TestDB.has('users', user)).toBeTruthy();
    expect(body.success).toBeTruthy();
    expect(body.message).toBe('Successfully logged in');
    expect(jwt.verify(body.data.token, process.env.JWT_SECRET)).toBeTruthy();
  });

  it('denies an invalid login attempt (wrong username)', async () => {
    const { body, status } = await request(app).post(route).send({
      username: '876',
      password: 'password'
    });
    expect(status).toBe(200);
    expect(body.success).toBeFalsy();
    expect(body.message).toBe('Invalid login details');
  });

  it('denies an invalid login attempt (wrong password)', async () => {
    const { body, status } = await request(app).post(route).send({
      username: '876',
      password: 'password'
    });
    expect(status).toBe(200);
    expect(body.success).toBeFalsy();
    expect(body.message).toBe('Invalid login details');
  });
});
