const loginService = require('../services/loginService');
const messages = require('../constants/messages');
const { rightCredentials } = require('../constants/messages');

class loginController {
    
  async login(request, response) {
    const user = await loginService.login(request);
    return response.status(200).json({ message: messages.rightCredentials, user });
  }

  async authenticate(request, response) {
    const user = await loginService.authenticate(request);
    return response.status(200).json({ message: rightCredentials, user });
  }
}

module.exports = new loginController();
