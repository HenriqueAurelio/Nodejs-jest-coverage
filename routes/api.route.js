const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const res = require('express/lib/response');

const prisma = new PrismaClient();

router.get('/users', async (request, response, next) => {
  try {
    const users = await prisma.user.findMany({ include: { authentication: true } });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/users/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { authentication: true },
    });
    if (user) {
      response.json(user);
      return;
    }
    response.status(400).json({ error: 'User not found' });
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (request, response, next) => {
  try {
    const { name, lastname, email, phone, birth, authenticationId } = request.body;
    const user = await prisma.user.create({
      data: {
        name,
        lastname,
        email,
        phone,
        birth,
        authenticationId,
      },
    });
    response.json(user);
  } catch (error) {
    next(error);
  }
});

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

router.delete('/users/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    await prisma.user.delete({
      where: { id },
    });
    response.status(200).json({ message: 'The user was deleted successfully' });
  } catch (error) {
    response.status(404).json({ error: 'User not found with this id' });
  }
});

module.exports = router;
