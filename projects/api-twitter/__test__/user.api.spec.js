const request = require('supertest');
const example = require('./simple-server');
const server = require('../server');
const config = require('../server/config');
const database = require('../server/database');

const { Model: User } = require('../server/api/v1/users/model');
const { Model: Tweets } = require('../server/api/v1/tweets/model');

describe('Api User and Tweets', () => {
  let token = '';
  let userId = '';
  let tweetId = '';
  beforeAll(() => {
    database.connect({ url: `${config.database.url}-test` });
  });

  beforeEach(() => {
    // Create test data
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Tweets.deleteMany({});
    database.disconnect();
  });

  describe('Users', () => {
    test('Get User ', async () => {
      const response = await request(example).get('/api/users');
      const { body } = response;
      const { name } = body;
      expect(name).toEqual('john');
    });

    test('Sign Up', async () => {
      // send para enviar datos en supertest
      const response = await request(server).post('/api/users/signup').send({
        username: 'jcarranzav1',
        name: 'Juan Diego',
        lastname: 'Carranza',
        email: 'jcarranzav98@gmail.com',
        password: '12345678',
      });
      const { body } = response;
      const { data } = body;
      userId = data.id;

      expect(userId).toBeDefined();
      expect(data.username).toBe('jcarranzav1');
      expect(data.email).toBe('jcarranzav98@gmail.com');

      expect(data.password).toBeUndefined();
    });

    test('Sign In Failed', async () => {
      const response = await request(server).post('/api/users/signin').send({
        username: 'jcarranzav1',
        password: '123',
      });
      const { body } = response;
      const { message } = body;
      expect(message).toBe('Username or password invalid');
    });

    test('Sign In', async () => {
      const response = await request(server).post('/api/users/signin').send({
        username: 'jcarranzav1',
        password: '12345678',
      });
      const { body } = response;
      const { data } = body;
      const { id } = data;

      token = body.meta.token;

      expect(id).toBeDefined();
      expect(id).toBe(userId);
      expect(token).toBeDefined();
    });

    test('Profile', async () => {
      const response = await request(server)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);
      const { body } = response;
      const { data } = body;
      const { id } = data;

      expect(id).toBeDefined();
      expect(id).toBe(userId);
    });

    test('Update User', async () => {
      const response = await request(server)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'Lemiwinks',
          name: 'Diego',
          lastname: 'Vega',
        });

      const { body } = response;
      const { data } = body;

      expect(data.username).toBe('Lemiwinks');
      expect(data.fullname).toBe('Diego Vega');
    });
  });

  describe('Tweets', () => {
    const createTweet = async (data) => {
      const response = await request(server)
        .post('/api/tweets')
        .set('Authorization', `Bearer ${token}`)
        .send(data);
      return response;
    };

    test('Create Tweet', async () => {
      const response = await createTweet({
        content: 'My First Tweet',
        location: 'Peru',
      });

      const { body } = response;
      const { data } = body;
      tweetId = data.id;

      expect(data.content).toBe('My First Tweet');
      expect(data.location).toBe('Peru');
      expect(tweetId).toBeDefined();
    });

    test('Get All Tweets', async () => {
      await createTweet({
        content: 'Codplay will come here to Peru',
        location: 'Peru',
      });

      await createTweet({
        content: 'Pedro Castillo is so stupid',
        location: 'Peru',
      });
      const response = await request(server).get('/api/tweets');
      const { body } = response;
      const { data } = body;

      expect(data.length).toBe(3);
    });

    test('Get Tweets by ID', async () => {
      const response = await request(server).get(`/api/tweets/${tweetId}`);
      const { body } = response;
      const { data } = body;
      const { user } = data;
      expect(data.content).toBe('My First Tweet');
      expect(data.location).toBe('Peru');
      expect(user.id).toBe(userId);
      expect(user.username).toBe('Lemiwinks');
    });

    test('Users Tweets', async () => {
      const response = await request(server).get(`/api/users/${userId}/tweets`);
      const { body } = response;
      const { data } = body;
      expect(data.length).toBe(3);
    });
  });
});

/* sin async await
  test('Get User ', (done) => {
    request(app)
      .get('/api/users')
      // el .expect es del supertest, y el expect sin punto es de jest
      .expect((response) => {
        const { body } = response;
        const { name } = body;
        expect(name).toEqual('john');
      })
      .expect(200, done);
  }); */
