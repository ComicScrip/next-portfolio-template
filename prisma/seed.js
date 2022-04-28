const { hashPassword } = require('../models/user');
const db = require('../db');

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
        titleFR: 'P1 FR version',
        titleEN: 'P1 EN version',
        descriptionEN: 'P1 description EN version',
        descriptionFR: 'P1 description FR version',
        mainPictureUrl:
          'https://ucarecdn.com/be32d5a2-4ef2-4a47-8e73-7142f80ae188/ms_project_2013_2.jpg',
      },
      {
        titleFR: 'P2 FR version',
        titleEN: 'P2 EN version',
        descriptionEN: 'P2 description EN version',
        descriptionFR: 'P2 description FR version',
        mainPictureUrl:
          'https://ucarecdn.com/ddffed41-46bc-4cd8-a161-a41e49c2aa72/innovatiedoel.jpg',
      },
    ],
  });
}

seed();

module.exports = seed;
