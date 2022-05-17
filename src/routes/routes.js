const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const authenticate = require('../middlewares/auth');
const paginatedResults = require('../middlewares/pagination');

// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express');

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'Documentação da API do PressStart',
//       version: '1.0.0',
//       description: 'Painel da API do PressStart',
//       contact: {
//         name: 'Lyncas',
//         url: 'https://lyncas.net',
//         email: 'henrique.s@lyncas.net'
//       }
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000/api'
//       }
//     ]
//   },
//   apis: [`D:/programacao/CrashCourse/Crash-Course/src/controllers/*.js`]
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
router.get('/', (request, response) => {
  response.send({
    message: 'Rota para usuários /users'
  });
});

router.post('/auth', loginController.authenticate);
router.use(authenticate);

router.get('/users', userController.index);

router.get(
  '/paginated/users',
  paginatedResults('user'),
  userController.indexPaginated
);

router.get('/users/:id', userController.show);

router.post('/users', userController.store);

router.put('/users/:id', userController.update);

router.delete('/users/:id', userController.delete);

/**
 *  @swagger
 *  /users:
 *    get:
 *       tags: [Users]
 *       description: Get All users
 *       responses:
 *          200:
 *             description: Success
 *
 *    post:
 *     description: Create a user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: name
 *        description: name of the user
 *        in: formData
 *        required: true
 *        type: string
 *
 *      - lastname: lastname
 *        description: lastname of the user
 *        in: formData
 *        required: true
 *        type: string
 *
 *      - name: birth
 *        description: birth of the user
 *        in: formData
 *        required: true
 *        type: DateTime
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           type: object
 *           $ref: '#/definitions/users'
 */

module.exports = router;
