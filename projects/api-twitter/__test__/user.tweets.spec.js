const request = require('supertest');
const server = require('../server');
const config = require('../server/config');
const database = require('../server/database');

const { Model: User } = require('../server/api/v1/users/model');

describe('Users', () => {
  const userData = {
    username: 'Pridemaster08',
    name: 'Carlos Manuel',
    lastname: 'Carranza',
    email: 'ccarranza@gmail.com',
    password: '12345678',
  };
  let token = '';

  beforeAll(async () => {
    database.connect({ url: `${config.database.url}-test` });

    const response = await request(server)
      .post('/api/users/signup')
      .send(userData);
    token = response.body.meta.token;
  });

  beforeEach(() => {
    // Create test data
  });

  afterAll(async () => {
    await User.deleteMany({});
    database.disconnect();
  });

  /* afterAll(() => {
    database.disconnect();
  }); */

  test('Create Tweet', async () => {
    console.log(token);
  });
});
