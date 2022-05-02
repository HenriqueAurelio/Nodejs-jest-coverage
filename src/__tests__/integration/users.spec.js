const request = require('supertest');
const app = require('../../server/server');
const prisma = require('../../data/prisma');


const user = {
  name: 'Henrique',
  lastname: 'Silva',
  birth: new Date(),
  phone: '3232514364',
  email: 'henriquess@gmail.com',
  password: '12345',
  status: true,
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
    await prisma.user.deleteMany({});
  });
  it('should get users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
  });

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
