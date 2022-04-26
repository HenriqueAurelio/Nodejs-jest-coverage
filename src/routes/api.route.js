const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const userController = require('../controllers/userController');
const prisma = new PrismaClient();

router.get('/users', userController.index);

router.get('/users/:id', userController.show);

router.post('/users', userController.store);

router.put('/users/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, lastname, email, phone, birth, authenticationId } = request.body;
    const contactExists = await prisma.user.findUnique({
      where: { email },
    });
    if (contactExists && contactExists.id !== id) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already been taken' });
    }
    const user = await prisma.user.update({
      where: { id },
      data: { name, lastname, email, phone, birth, authenticationId },
      include: { authentication: true },
    });
    response.json(user);
  } catch (error) {}
});

router.delete('/users/:id', userController.delete);

module.exports = router;
