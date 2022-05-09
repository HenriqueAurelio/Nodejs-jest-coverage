const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const authentications = [
  {
    id: uuid.v4(),
    password: bcrypt.hashSync('123456'),
    status: true,
    createdAt: new Date(),
  },
  {
    id: uuid.v4(),
    password: bcrypt.hashSync('987654321'),
    status: false,
    createdAt: new Date(),
  },
  {
    id: uuid.v4(),
    password: bcrypt.hashSync('admin'),
    status: false,
    createdAt: new Date(),
  },
];

module.exports = authentications;