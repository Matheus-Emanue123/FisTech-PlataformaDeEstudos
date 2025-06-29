import { PrismaClient } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create UserType records
  const userTypes = [
    {
      tipo: 'administrador',
      permissoes: {
        canManageUsers: true,
        canManageContent: true,
        canManageSystem: true,
        canViewAnalytics: true
      }
    },
    {
      tipo: 'moderador',
      permissoes: {
        canManageUsers: false,
        canManageContent: true,
        canManageSystem: false,
        canViewAnalytics: true
      }
    },
    {
      tipo: 'usuario_padrao',
      permissoes: {
        canManageUsers: false,
        canManageContent: false,
        canManageSystem: false,
        canViewAnalytics: false
      }
    }
  ];

  for (const userType of userTypes) {
    const existingUserType = await prisma.userType.findUnique({
      where: { tipo: userType.tipo }
    });

    if (!existingUserType) {
      await prisma.userType.create({
        data: userType
      });
      console.log(`✅ Created UserType: ${userType.tipo}`);
    } else {
      console.log(`⏭️  UserType already exists: ${userType.tipo}`);
    }
  }

  // Create some basic NivelDificuldade records
  const niveis = [
    { nome: 'Iniciante', xp: 0 },
    { nome: 'Intermediário', xp: 100 },
    { nome: 'Avançado', xp: 500 },
    { nome: 'Expert', xp: 1000 }
  ];

  for (const nivel of niveis) {
    const existingNivel = await prisma.nivelDificuldade.findFirst({
      where: { nome: nivel.nome }
    });

    if (!existingNivel) {
      await prisma.nivelDificuldade.create({
        data: nivel
      });
      console.log(`✅ Created NivelDificuldade: ${nivel.nome}`);
    } else {
      console.log(`⏭️  NivelDificuldade already exists: ${nivel.nome}`);
    }
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 