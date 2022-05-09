const prisma = require('../data/prisma');
const authentications = require('../mock/authentications');
const users = require('../mock/users')



async function databaseSeed() {

    await prisma.authentication.deleteMany({});
    await prisma.user.deleteMany({});

    await prisma.authentication.createMany({data:authentications,})
    await prisma.user.createMany({data:users,})
}

databaseSeed().catch((error) => {
    console.error(error);
    process.exit(1);
}).finally(async () => { await prisma.$disconnect() });