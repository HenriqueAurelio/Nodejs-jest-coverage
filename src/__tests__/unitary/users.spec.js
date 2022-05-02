const fakeUserRepository = require('../../repositories/fakeUserRepository');

const user =
{
  name: "userUpdated",
  lastname: "userUpdated",
  email: "userUpdated@gmail.com",
  birth: "1970-01-01T00:00:00.000Z",
  phone: "3232514364",
}

describe('User routes ', () => {
  it('should get users', async () => {
    const res = await fakeUserRepository.index();
    expect(res).toBeTruthy();
  });

  it('should get a user by id', async () => {
    const users = await fakeUserRepository.index();
    const res = await fakeUserRepository.show(users[0].id);
    expect(res).toBeTruthy();
  });
  it('should get a user by email', async () => {
    const users = await fakeUserRepository.index();
    const res = await fakeUserRepository.findByEmail(users[0].email);
    expect(res).toBeTruthy();
  });
  it('should update a user', async () => {
    const users = await fakeUserRepository.index();
    const userToBeUpdated = users[0]; 
    const res = await fakeUserRepository.update(users[0].id, user);
    expect(res.name).not.toBe(userToBeUpdated.name);
    expect(res.email).not.toBe(userToBeUpdated.email);
    expect(res.name).not.toBe(userToBeUpdated.name);
    expect(res.lastname).not.toBe(userToBeUpdated.lastname);
  });
  it('should delete a user', async () => {
    const users = await fakeUserRepository.index();
    const res = await fakeUserRepository.delete(users[0].id);
  
  })
});
