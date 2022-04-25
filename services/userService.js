const userRepository = require('../repositories/userRepository');

class userService {
  async index(request, response) {
    const users = await userRepository.listAll();
    return response.status(200).json(users);
  }

  async show(request, response) {
    const { id } = request.params;
    const user = await userRepository.findById(id);
    return user;
  }
  async store(request, response) {
    const user = await userRepository.create(request.body);
    return response.status(200).json({ user });
  }
  async update(request, response) {
    const { id } = response.params;
    const user = await userRepository.update(id, request.body);
    return response.status(200).json({ user });
  }
  async delete(request, response) {
    const { id } = request.params;
    await userRepository.delete(id);
    return response
      .status(200)
      .json({ message: 'User has been deleted successfully' });
  }
}

module.exports = new userService();
