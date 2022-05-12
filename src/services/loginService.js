const customError = require('../middlewares/customError');
const userRepository = require('../repositories/userRepository');
const messages = require('../constants/messages');
const bcrypt = require('bcryptjs')
const authenticationRepository = require('../repositories/authenticationRepository')

class loginService {
  async authenticate(request) {
    const {email,password} = request.body
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new customError(messages.wrongCredentials, 404);
    }
    const token = await userRepository.generateJWTToken(user.id);

    const authentication = await authenticationRepository.findById(user.authenticationId)
    const isValidPassword = await bcrypt.compare(password, authentication.password);
    if (!isValidPassword) {
      throw new customError(messages.wrongCredentials, 404);
    }
    return ({user,token});
  }
}

module.exports = new loginService();


