const fakeUserRepository = require('../../repositories/fakeUserRepository');
const userId = '93b57009-4274-4c99-b23b-875e2b1ce2e2'
describe('User routes ', () => {
  it('should get users', async () => {
    const res = await fakeUserRepository.index();
    expect(res).toBeTruthy();
  });

  it('should get a user by id', async () => {
    const res = await fakeUserRepository.show(userId);
    expect(res).toBeTruthy();
  });
});
