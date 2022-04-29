const prisma = require('../data/prisma');

class authenticationRepository {
  async index() {
    const authentications = await prisma.authentication.findMany({ include: { authentication: true } });
    return authentications;
  }

  async store(authenticationRequest) {
    const authentication = await prisma.authentication.create({
      data: authenticationRequest,
    });
    return authentication;
  }

  async show(id) {
    const authentication = await prisma.authentication.findUnique({
      where: { id },
    });
    return authentication;
  }
  async findById(id) {
    const authenticationExists = await prisma.authentication.findUnique({ where: { id } });
    return authenticationExists;
  }
  async update(id, authenticationRequest) {
    const authentication = await prisma.user.update({
      where: { id },
      data: authenticationRequest,
    });
    return authentication;
  }
  async delete(id) {
    await prisma.authentication.delete({ where: { id } });
  }
}

module.exports = new authenticationRepository();
