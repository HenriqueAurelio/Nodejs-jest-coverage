const fakeUserRepository = require('../../repositories/fakeUserRepository');

describe('User routes ', () => {
  it('should get users', async () => {
    const res = await fakeUserRepository.index();
    expect(res).toBeTruthy();
  });

  it('should get a user by id', async () => {
    const res = await fakeUserRepository.index();
    expect(res).toBeTruthy();
  });
});
