const PORT = process.env.PORT || 3000;
const app = require('./src/server/server')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');



const swaggerOptions = { 
  swaggerDefinition: {
    info: {
      title: 'Press Star API',
      version: '1.0.0'
    }
  },
  apis:['app.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))
app.listen(PORT, () => {
  console.log(`🚀 @ http://localhost:${PORT}`)
});







/**
 *  @swagger
 *  /users:
 *    get:
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
