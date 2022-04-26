const userService = require('../services/userService');
class userController {
  async index(request, response) {
    const users = await userService.index(request, response);
    return response.status(200).json(users);
  }

  async show(request, response) {
    const user = await userService.show(request);
    return response.status(200).json(user);
  }
  async store(request, response) {
    const user = await userService.store(request);
    return response.status(201).json(user);
  }
  async update(request, response) {
    const user = await userService.update(request);
    return response.status(200).json(user);
  }
  async delete(request, response) {
    await userService.delete(request);
    return response
      .status(200)
      .json({ message: 'Usuário foi deletado com sucesso' });
  }
}

module.exports = new userController();
