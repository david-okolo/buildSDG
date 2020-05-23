import request from 'supertest';

import app from '../src/app';
import { sequelize } from '../src/app/models';
import helpers from './test.helper';

const { TestDB } = helpers;

describe('POST /register Tests', () => {
  const route = '/register';

  beforeAll(async () => {
    // clear the tables before we start running tests
    await sequelize.truncate();
  });

  afterAll(async () => {
    await sequelize.truncate();
  });

  /**
   * TODO: Test to check for a bad request reply from server
   */

  it('correctly registers user', async () => {
    const user = {
      name: 'Jack Rich',
      username: '09076421865',
      password: 'password'
    };

    const { body, status } = await request(app).post(route).send(user);
    expect(status).toBe(200);
    expect(await TestDB.has('Users', {
      name: 'Jack Rich',
      username: '09076421865'
    })).toBeTruthy();
    expect(body.success).toBeTruthy();
    expect(body.message).toBe('Successfully Registered');
  });

  // it('denies an invalid login attempt (wrong username)', async () => {
  //   const { body, status } = await request(app).post(route).send({
  //     username: '876',
  //     password: 'password'
  //   });
  //   expect(status).toBe(200);
  //   expect(body.success).toBeFalsy();
  //   expect(body.message).toBe('Invalid login details');
  // });

  // it('denies an invalid login attempt (wrong password)', async () => {
  //   const { body, status } = await request(app).post(route).send({
  //     username: '876',
  //     password: 'password'
  //   });
  //   expect(status).toBe(200);
  //   expect(body.success).toBeFalsy();
  //   expect(body.message).toBe('Invalid login details');
  // });
});
