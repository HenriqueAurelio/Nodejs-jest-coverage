const uuid = require('uuid')
const authentications = require('./authentications')
let authenticationIds = authentications.map(auth => auth.id);
const users = [
  {
    id: uuid.v4(),
    name: 'Henrique',
    lastname: 'Silva',
    phone: '3232514364',
    email: 'henrique@gmail.com',
    birth: new Date(),
    createdAt: new Date(),
    authenticationId:authenticationIds[0]
  },
  {
    id: uuid.v4(),
    name: 'Erick',
    lastname: 'Mendes',
    phone: '3232514364',
    email: 'erick@gmail.com',
    birth: new Date(),
    createdAt: new Date(),
    authenticationId:authenticationIds[1]
  },
  {
    id: uuid.v4(),
    name: 'Admin',
    lastname: 'Master',
    phone: '3232514364',
    email: 'admin@gmail.com',
    birth: new Date(),
    createdAt: new Date(),
    authenticationId:authenticationIds[2]
  },
];

module.exports = users;
