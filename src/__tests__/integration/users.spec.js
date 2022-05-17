const request = require('supertest');
const app = require('../../server/server');
const messages = require('../../constants/messages');
const seed = require('../../seed/seed');
const {
  user,
  updateUser,
  admin,
  wrongUser,
  wrongPassword
} = require('../../mock/integrationData');

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

  it('should update a user', async () => {
    const authorized = await request(app).post('/auth').send(admin);

    const users = await request(app)
      .get('/users')
      .set('authorization', authorized.body.token);
    var userToBeFound =
      users.body[Math.floor(Math.random() * (users.body.length - 1)) + 0];
    while (userToBeFound.email == 'admin@gmail.com') {
      userToBeFound =
        users.body[Math.floor(Math.random() * (users.body.length - 1)) + 0];
    }
    const res = await request(app)
      .put(`/users/${userToBeFound.id}`)
      .set('authorization', authorized.body.token)
      .send(updateUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).not.toBe(userToBeFound.name);
    expect(res.body.id).not.toBe(userToBeFound.id);
    expect(res.body.lastname).not.toBe(userToBeFound.lastname);
    expect(res.body.phone).not.toBe(userToBeFound.phone);
    expect(res.body.email).not.toBe(userToBeFound.email);
  });

  it('should delete a user', async () => {
    const { body } = await request(app).post('/auth').send(admin);
    const { token } = body;
    const { body: users } = await request(app)
      .get('/users')
      .set('authorization', token);
    var userToBeDeleted = users[Math.floor(Math.random() * (users.length - 1)) + 0];
    while (userToBeDeleted.email == 'admin@gmail.com') {
      userToBeDeleted = users[Math.floor(Math.random() * (users.length - 1)) + 0];
    }
    const deleteOperation = await request(app)
      .delete(`/users/${userToBeDeleted.id}`)
      .set('authorization', token);
    expect(deleteOperation.statusCode).toBe(200);
  });

  it('should return paginated users', async () => {
    const { body } = await request(app).post('/auth').send(admin);
    const { token } = body;
    const paginatedOperation = await request(app)
      .get(`/paginated/users?page=2&limit=1`)
      .set('authorization', token);
    expect(paginatedOperation.statusCode).toBe(200);
  });

  it('shouldnt return paginated users', async () => {
    const { body } = await request(app).post('/auth').send(admin);
    const { token } = body;
    const paginatedOperation = await request(app)
      .get(`/paginated/users?page=2&limitss=1`)
      .set('authorization', token);
    expect(paginatedOperation.statusCode).toBe(400);
    expect(paginatedOperation.body.message).toBe(messages.badRequest);
  });

  it('shouldnt authenticate the user with wrong email', async () => {
    const res = await request(app).post('/auth').send(wrongUser);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe(messages.wrongCredentials);
  });

  it('shouldnt authenticate the user with wrong password', async () => {
    const res = await request(app).post('/auth').send(wrongPassword);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe(messages.wrongCredentials);
  });

  it('shouldnt get users with wrong token', async () => {
    const res = await request(app)
      .get('/users')
      .set('authorization', 'dsahdusahudsahudsa');
    expect(res.statusCode).toEqual(401);
  });

  it('shouldnt get users without token', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(401);
  });

  it('shouldnt delete a user', async () => {
    const { body } = await request(app).post('/auth').send(admin);
    const { token } = body;
    const deleteOperation = await request(app)
      .delete(`/users/id`)
      .set('authorization', token);
    expect(deleteOperation.statusCode).toBe(404);
  });

  it('shouldnt find a user', async () => {
    const authorized = await request(app).post('/auth').send(admin);

    const res = await request(app)
      .get(`/users/user_id`)
      .set('authorization', authorized.body.token);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe(messages.userIdInvalid);
  });

  it('shouldnt update a user', async () => {
    const authorized = await request(app).post('/auth').send(admin);

    const users = await request(app)
      .get('/users')
      .set('authorization', authorized.body.token);
    var userToBeFound =
      users.body[Math.floor(Math.random() * (users.body.length - 1)) + 0];

    while (userToBeFound.email == 'admin@gmail.com') {
      userToBeFound =
        users.body[Math.floor(Math.random() * (users.body.length - 1)) + 0];
    }

    updateUser.email = 'admin@gmail.com';
    const res = await request(app)
      .put(`/users/${userToBeFound.id}`)
      .set('authorization', authorized.body.token)
      .send(updateUser);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe(messages.userEmailInUse);
  });

  it('shouldnt update a user with wrong id', async () => {
    const authorized = await request(app).post('/auth').send(admin);

    const users = await request(app)
      .get('/users')
      .set('authorization', authorized.body.token);
    var userToBeFound =
      users.body[Math.floor(Math.random() * (users.body.length - 1)) + 0];
    userToBeFound.id = 'wrongId';
    const res = await request(app)
      .put(`/users/${userToBeFound}`)
      .set('authorization', authorized.body.token)
      .send(updateUser);

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe(messages.userIdInvalid);
  });

  it('shouldnt create a user', async () => {
    const authorized = await request(app).post('/auth').send(admin);
    delete user.phone;
    console.log(user);
    const res = await request(app)
      .post('/users')
      .send(user)
      .set('authorization', authorized.body.token);
    expect(res.statusCode).toEqual(500);
  });
});
