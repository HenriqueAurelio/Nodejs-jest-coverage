const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// EXEMPLO DE ADAPTER

// const resolver = (handlerFn) => {
//   return (req, res, next) => {
//     return Promise.resolve(handlerFn(req,res,next)).catch(e=>next(e));
//   };
// };

// router.get('/users/:id', resolver(userController.show));

router.get('/', (request, response) => {
  response.send({
    message: 'Rota para usuários /users e documentação da api /api-docs',
  });
});
router.get('/users', userController.index);

router.get('/users/:id', userController.show);

router.post('/users', userController.store);

router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

module.exports = router;
