class userRepository {
  async listAll() {
    const users = await prisma.user.findMany({ include: { authentication: true } });
    return users;
  }

  async store(userRequest) {
    const user = await prisma.user.create({
      data: {
        userRequest,
      },
    });
    return user;
  }

  async findById(id) {
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
  async update(id, userRequest) {
    const user = await prisma.user.update({
      where: { id },
      data: { userRequest, lastname, email, phone, birth, authenticationId },
      include: { authentication: true },
    });
    return user;
  }
  async delete(id) {
    await prisma.user.delete({
      where: { id },
    });
  }
}
