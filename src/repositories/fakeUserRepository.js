var users = require('../mock/users');
var authentications = require('../mock/authentications');

class fakeUserRepository {
  async index() {
    const listOfUsers = users;
    return listOfUsers;
  }

  //   async store(userRequest) {
  //     const user = await prisma.user.create({
  //       data: userRequest,
  //     });
  //     return user;
  //   }

  async show(id)
  {
    const user = users.find((user) => user.id ===id)
    return user;
  }
  //   async findByEmail(email) {
  //     const userExists = await prisma.user.findUnique({ where: { email } });
  //     return userExists;
  //   }
  //   async findById(id) {
  //     const userExists = await prisma.user.findUnique({ where: { id } });
  //     return userExists;
  //   }
  //   async update(id, userRequest) {
  //     const user = await prisma.user.update({
  //       where: { id },
  //       data: userRequest,
  //       include: { authentication: true },
  //     });
  //     return user;
  //   }
  //   async delete(id) {
  //     await prisma.user.delete({ where: { id } });
  //   }
}
module.exports = new fakeUserRepository();
