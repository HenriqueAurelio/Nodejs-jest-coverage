const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const authenticate = require('../middlewares/auth');


router.get('/', (request, response) => {
  response.send({
    message: 'Rota para usuários /users e documentação da api /api-docs',
  });
});

router.post('/auth', loginController.authenticate);

router.get('/users', authenticate,userController.index);

router.get('/users/:id', authenticate,userController.show);

router.post('/users', authenticate,userController.store);

router.put('/users/:id', authenticate, userController.update);

router.delete('/users/:id', authenticate,userController.delete);
module.exports = router;
