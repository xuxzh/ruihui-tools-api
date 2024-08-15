import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.aac_user.upsert({
    where: { userCode: 'admin' },
    update: {},
    create: {
      userCode: 'admin',
      userName: 'admin',
      email: 'xxz0528@qq.com',
    },
  });

  const testUser = await prisma.aac_user.upsert({
    where: { userCode: 'testUser' },
    update: {},
    create: {
      userCode: 'testUser',
      userName: '测试账号',
      email: 'test@qq.com',
    },
  });
  console.log(adminUser, testUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
