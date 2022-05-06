const customError = require('../middlewares/customError');
const userRepository = require('../repositories/userRepository');
const messages = require('../constants/messages');
const bcrypt = require('bcryptjs')

class loginService {
  async authenticate(request) {
    const data = await userRepository.authenticate(request.body);
    const isValidPassword = await bcrypt.compare(request.body.password, data.authentication.password);
    if (!data.user || !isValidPassword) {
      throw new customError(messages.wrongCredentials, 404);
    }
    const {user,token} = data
      return ({user,token});
  }
}

module.exports = new loginService();
