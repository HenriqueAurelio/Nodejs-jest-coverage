const prisma = require('../data/prisma');
const authentications = require('../mock/authentications');
const users = require('../mock/users')

async function databaseSeed() {

    await prisma.authentication.deleteMany({});
    await prisma.user.deleteMany({});

    await prisma.authentication.createMany({data:authentications,})
    await prisma.user.createMany({data:users,})
}



module.exports = databaseSeed;

