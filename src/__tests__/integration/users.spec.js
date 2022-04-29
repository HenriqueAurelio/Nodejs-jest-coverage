const request = require('supertest');
const app = require('../../server/server');
const uuid = require('uuid')
const authentication = {
  id: uuid.v4(),
  status: true,
  password: '133434',
  createdAt: '2022-04-26T12:41:20.336Z',
};
const user = {
  id: uuid.v4(),
  name: 'Henrique',
  lastname: 'Silva',
  phone: '3232514364',
  email: 'henrique@gmail.com',
  authenticationId: 'cl2g509u80014rwdt2xc4q8ar',
  createdAt: '2022-04-26T12:41:20.336Z',
};

describe('Test app server ', () => {
  it('should get main route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});

describe('User routes ', () => {
  it('should get users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
  });

  it('should create an authentication', async () => {
    const res = await request(app).post('/authentications').send
  })
  it('should create a user', async () => {
      const res = await request(app).post('/users').send(user)
      expect(res.statusCode).toEqual(201)
  })

  //   it('should find a user', async () => {
  //     const res = await request(app).get(`/users/${user.id}`);
  //     console.log(res.body);
  //     expect(res.statusCode).toEqual(200);
  //   });
});
