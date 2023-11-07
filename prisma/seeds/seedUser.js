const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function seedUser() {
    const userData = {
        name: 'Master',
        email: 'master@outlook.com',
        password: await bcrypt.hash('1q2w3e4r', 10)
    };
    await prisma.user.create({
        data: userData
    });
}
async function main() {
    await seedUser();
}
main()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seedUser.js.map