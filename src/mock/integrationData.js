const uuid = require('uuid');
const user = {
  id: uuid.v4(),
  name: 'Henrique',
  lastname: 'Silva',
  birth: new Date(),
  phone: '3232514364',
  email: 'henriquess@gmail.com',
  password: '12345',
  status: true
};

const updateUser = {
  name: 'Usuario Atualizado',
  lastname: 'Usuario Atualizado',
  birth: new Date(),
  phone: '32325143642',
  email: 'Usuario Atualizado@gmail.com',
  password: '123456',
  status: false
};

const admin = {
  email: 'admin@gmail.com',
  password: 'admin'
};
const wrongUser = {
  email: 'admin@gmails.com',
  password: 'admin'
};

const wrongPassword = {
  email: 'admin@gmail.com',
  password: 'admin2'
};

module.exports = { user, updateUser, admin, wrongUser, wrongPassword };
