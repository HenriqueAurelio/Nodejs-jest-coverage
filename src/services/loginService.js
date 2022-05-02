const customError = require('../middlewares/customError');
const userRepository = require('../repositories/userRepository');
const messages = require('../constants/messages');

class loginService {
  async login(request) {
    const user = await userRepository.login(request);
    if (user) return user;
    throw new customError(messages.wrongCredentials, 404);
  }
}

module.exports = loginService;
