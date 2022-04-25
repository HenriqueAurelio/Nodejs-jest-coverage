const userService = require('../services/userService');
class userController {
  async index(request, response) {
    userService.index(request, response);
  }

  async show(request, response) {
    const user = await userService.show(request);
    response.json(user);
  }
  async store(request, response) {
    const user = await userService.store(request);
    response.json({ message: 'User has been created', user });
  }
  async update(request, response) {}
  async delete(request, response) {}
}

module.exports = new userController();
