const prisma = require('../data/prisma');

class authenticationRepository {
  async findById(id) {
    const authentication = await prisma.authentication.findUnique({
      where: { id }
    });
    return authentication;
  }
}

module.exports = new authenticationRepository();
