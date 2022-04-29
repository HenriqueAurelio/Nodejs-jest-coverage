const uuid = require('uuid');
const authentications = [
  {
    id: uuid.v4(),
    password: '123456',
    status: true,
    createdAt: new Date(),
  },
  {
    id: uuid.v4(),
    password: '987654321',
    status: false,
    createdAt: new Date(),
  },
];

module.exports = authentications;
