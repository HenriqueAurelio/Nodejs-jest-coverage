const userRepository = require('../repositories/userRepository');

class userService {
  async index() {
    const users = await userRepository.index();
    return users;
  }

  async show(request) {
    const { id } = request.params;
    const user = await userRepository.show(id);
    if (user) return user;
    throw new Error({ error: 'Não foi achado o usuário com esse id' });
  }
  async store(request) {
    const user = await userRepository.store(request.body);
    if (user) return user;
    throw new Error({ error: 'Não foi possível criar o usuário' });
  }
  async update(request, response) {
    const { id } = response.params;
    const user = await userRepository.update(id, request.body);
    if (user) return response.status(200).json({ user });
    throw new Error({ error: 'Não foi achado o usuário com esse id' });
  }
  async delete(request, response) {
    const { id } = request.params;
    await userRepository.delete(id);
  }
}

module.exports = new userService();
