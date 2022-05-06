const loginService = require('../services/loginService');
const messages = require('../constants/messages');

class loginController {
  async authenticate(request, response) {
    const user = await loginService.authenticate(request);
    return response.status(200).json({ message: messages.rightCredentials, user });
  }
}

module.exports = new loginController();
