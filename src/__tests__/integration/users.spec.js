const request = require('supertest');
const app = require('../../server/server');
const uuid = require('uuid');
const messages = require('../../constants/messages');
const seed = require('../../seed/seed')

const user = {
  id: uuid.v4(),
  name: 'Henrique',
  lastname: 'Silva',
  birth: new Date(),
  phone: '3232514364',
  email: 'henriquess@gmail.com',
  password: '12345',
  status: true
};

const admin = {
  email: 'admin@gmail.com',
  password: 'admin'
};

describe('Test app server ', () => {
  it('should get main route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});

describe('User routes ', () => {
  beforeAll(async () => {
    await seed();
  });

  
  it('should authenticate the user', async () => {
    const authorized = await request(app).post('/auth').send(admin);
    expect(authorized.statusCode).toEqual(200);
    expect(authorized.body.message).toBe(messages.rightCredentials);
  });

  it('should get users', async () => {
    const authorized = await request(app).post('/auth').send(admin);
    const res = await request(app)
      .get('/users')
      .set('authorization', authorized.body.token);
    expect(res.statusCode).toEqual(200);
  });

  it('should create a user', async () => {
    const authorized = await request(app).post('/auth').send(admin);

    const res = await request(app)
      .post('/users')
      .send(user)
      .set('authorization', authorized.body.token);
    expect(res.statusCode).toEqual(201);
  });

  it('should find a user', async () => {
    const authorized = await request(app).post('/auth').send(admin);

    const users = await request(app)
      .get('/users')
      .set('authorization', authorized.body.token);
    const userToBeFound =
      users.body[Math.floor(Math.random() * (users.body.length - 1)) + 0];
    const res = await request(app)
      .get(`/users/${userToBeFound.id}`)
      .set('authorization', authorized.body.token);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe(userToBeFound.name);
    expect(res.body.id).toBe(userToBeFound.id);
    expect(res.body.lastname).toBe(userToBeFound.lastname);
    expect(res.body.phone).toBe(userToBeFound.phone);
    expect(res.body.email).toBe(userToBeFound.email);
  });

  it('should delete a user', async () => {
    const { body } = await request(app).post('/auth').send(admin);
    const { token } = body;
    const { body: users } = await request(app)
      .get('/users')
      .set('authorization', token);
    const { id } = users[Math.floor(Math.random() * (users.length - 1)) + 0];
    const deleteOperation = await request(app)
      .delete(`/users/${id}`)
      .set('authorization', token);
    expect(deleteOperation.statusCode).toBe(200);
  });



  it.only('shouldnt authenticate the user', async () => {
    const { body } = await request(app).post('/auth').send(admin);
    const { token } = body;
    const { body: users } = await request(app)
      .get('/users')
      .set('authorization', token);
    const { id } = users[Math.floor(Math.random() * (users.length - 1)) + 0];
    const deleteOperation = await request(app)
      .delete(`/users/${id}`)
      .set('authorization', "wrogntoken");
      expect(deleteOperation.statusCode).toEqual(401);
      expect(deleteOperation.body.message).toBe(messages.notAuthorized);
    });



  it('shouldnt find a user', async () => {
    const authorized = await request(app).post('/auth').send(admin);

    const res = await request(app)
      .get(`/users/user_id`)
      .set('authorization', authorized.body.token);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe(messages.userIdInvalid);
  });

  it('shouldnt delete a user', async () => {
    const { body } = await request(app).post('/auth').send(admin);
    const { token } = body;
    const { body: users } = await request(app)
      .get('/users')
      .set('authorization', token);
    const deleteOperation = await request(app)
      .delete(`/users/id`)
      .set('authorization', token);
    expect(deleteOperation.statusCode).toBe(404);
  });

  

});
