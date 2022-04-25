const userService = require('../services/userService');
class userController {
  async index(request, response) {
    userService.index(request, response);
  }

  async show(request, response) {
    const user = await userService.show(request);
    response.json(user);
  }
  async store(request, response) {}
  async update(request, response) {}
  async delete(request, response) {}
}

module.exports = new userController();
