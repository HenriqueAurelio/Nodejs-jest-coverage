const prisma = require('../data/prisma');

class userRepository {
  async index() {
    const users = await prisma.user.findMany();
    return users;
  }

  async store(userRequest) {
    const { name, lastname, birth, phone, email, status, password } = userRequest
    const user = await prisma.user.create({
      data: {
        name,
        lastname,
        birth,
        phone,
        email,
        authentication: {
          create: {
            status,
            password,
          }
        }
      }
    });
    return user;
  }

  async show(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { authentication: true },
    });
    return user;
  }
  async findByEmail(email) {
    const userExists = await prisma.user.findUnique({ where: { email } });
    return userExists;
  }
  async findById(id) {
    const userExists = await prisma.user.findUnique({ where: { id } });
    return userExists;
  }
  async update(id, userRequest) {
    const user = await prisma.user.update({
      where: { id },
      data: userRequest,
      include: { authentication: true },
    });
    return user;
  }
  async delete(id) {
    await prisma.user.delete({ where: { id } });
  }
}

module.exports = new userRepository();
