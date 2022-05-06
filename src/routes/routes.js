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
// router.use(authenticate);

router.get('/users', userController.index);

router.get('/users/:id', userController.show);

router.post('/users', userController.store);

router.put('/users/:id', userController.update);

router.delete('/users/:id', userController.delete);
module.exports = router;
