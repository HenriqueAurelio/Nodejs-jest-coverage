const userRepository = require('../repositories/userRepository');
const customError = require('../middlewares/customError');
const messages = require('../constants/messages')
class userService {
  async index() {
    const users = await userRepository.index();
    return users;
  }

  async show(request) {
    const { id } = request.params;
    const user = await userRepository.show(id);
    if (user) return user;
    throw new customError(messages.userIdInvalid, 404);
  }
  async store(request) {
    const user = await userRepository.store(request.body);
    if (user) return user;
    throw new customError(messages.userCreateError, 500);
  }
  async update(request) {
    const { id } = request.params;
    const userEmailInUse = await userRepository.findByEmail(request.body.email);
    if (userEmailInUse && userEmailInUse.id !== id)
      throw new customError(messages.userEmailInUse, 400);

    const user = await userRepository.update(id, request.body);
    if (user) return user;
    throw new customError(messages.userIdInvalid, 404);
  }
  async delete(request) {
    const { id } = request.params;
    const userToBeDeleted = await userRepository.findById(id);
    if (!userToBeDeleted)
    {
      throw new customError(messages.userDeleteError, 400);

    }
    await userRepository.delete(id);
  }
}

module.exports = new userService();
