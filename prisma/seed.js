require('module-alias/register');
import { hashPassword } from '@models/user';
import db from '@db'

async function seed() {
  await db.user.deleteMany();
  await db.user.create({
    data: {
      name: 'admin',
      email: 'admin@website.com',
      role: 'admin',
      hashedPassword: await hashPassword('verysecure'),
    },
  });

  await db.project.deleteMany();
  await db.project.createMany({
    data: [
      {
        title: 'P1',
        description: 'P1 description',
        mainPictureUrl:
          'https://ucarecdn.com/be32d5a2-4ef2-4a47-8e73-7142f80ae188/ms_project_2013_2.jpg',
      },
      {
        title: 'P2',
        description: 'P2 description',
        mainPictureUrl:
          'https://ucarecdn.com/ddffed41-46bc-4cd8-a161-a41e49c2aa72/innovatiedoel.jpg',
      },
    ],
  });
}

seed();

export default seed;
