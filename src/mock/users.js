const uuid = require('uuid')
const users = [
  {
    id: uuid.v4(),
    name: 'Henrique',
    lastname: 'Silva',
    phone: '3232514364',
    email: 'henrique@gmail.com',
    birth: new Date(),
    createdAt: new Date(),
  },
  {
    id: uuid.v4(),
    name: 'Erick',
    lastname: 'Mendes',
    phone: '3232514364',
    email: 'erick@gmail.com',
    birth: new Date(),
    createdAt: new Date(),
  },
];

module.exports = users;
