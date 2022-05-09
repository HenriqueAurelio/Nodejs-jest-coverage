const loginService = require('../services/loginService');
const messages = require('../constants/messages');

class loginController {
  async authenticate(request, response) {
    const result = await loginService.authenticate(request);
    const {user,token} = result
    return response.status(200).json({ message: messages.rightCredentials, user, token });
  }
}

module.exports = new loginController();
