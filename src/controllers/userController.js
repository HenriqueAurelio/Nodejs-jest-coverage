const userService = require('../services/userService');
const messages = require('../constants/messages')
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
    return response.status(201).json({message:messages.userCreatedSuccessfully,user});
  }
  async update(request, response) {
    const user = await userService.update(request);
    return response.status(200).json({ message: messages.userUpdatedSuccessfully, user });
  }
  async delete(request, response) {
    await userService.delete(request);
    return response
      .status(200)
      .json({ message: messages.userDeletedSuccessfully });
  }
}

module.exports = new userController();
