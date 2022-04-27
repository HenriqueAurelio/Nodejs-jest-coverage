const userRepository = require('../repositories/userRepository');
const customError = require('../middlewares/customError');
class userService {
  async index() {
    const users = await userRepository.index();
    return users;
  }

  async show(request) {
    const { id } = request.params;
    const user = await userRepository.show(id);
    if (user) return user;
    throw new customError('Não foi possível achar o usuário com esse id', 404);
  }
  async store(request) {
    const user = await userRepository.store(request.body);
    if (user) return user;
    throw new customError('Não foi possível criar o usuário', 500);
  }
  async update(request) {
    const { id } = request.params;
    const userEmailInUse = await userRepository.findByEmail(request.body.email);
    if (userEmailInUse && userEmailInUse.id !== id)
      throw new customError('Esse e-mail já foi cadastrado', 400);

    const user = await userRepository.update(id, request.body);
    if (user) return user;
    throw new customError('Não foi achado o usuário com esse id', 404);
  }
  async delete(request) {
    const { id } = request.params;
    await userRepository.delete(id);
  }
}

module.exports = new userService();
