import { PrismaClient } from '../src/generated/prisma';
import { hashPassword } from '../src/utils/jwt.utils'; // Import hashPassword

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create UserType records with simple, non-overlapping permissions
  const userTypes = [
    {
      tipo: 'administrador',
      permissoes: {
        canManageUsers: true,
        canManageContent: true,
        canManageComments: true,
        canViewAnalytics: true
      }
    },
    {
      tipo: 'moderador',
      permissoes: {
        canManageUsers: false,
        canManageContent: false,
        canManageComments: true,
        canViewAnalytics: false
      }
    },
    {
      tipo: 'usuario_padrao',
      permissoes: {
        canManageUsers: false,
        canManageContent: false,
        canManageComments: false,
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
      // Update existing user type with new permissions
      await prisma.userType.update({
        where: { tipo: userType.tipo },
        data: { permissoes: userType.permissoes }
      });
      console.log(`🔄 Updated UserType: ${userType.tipo}`);
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
    await prisma.nivelDificuldade.upsert({
      where: { nome: nivel.nome },
      update: { xp: nivel.xp },
      create: nivel
    });
    console.log(`✅ Upserted NivelDificuldade: ${nivel.nome}`);
  }

  // --- 1. Create a dedicated administrator user ---
  const adminEmail = 'admin-test@example.com';
  const adminPassword = 'adminpassword';
  const hashedAdminPassword = await hashPassword(adminPassword);

  const adminUserType = await prisma.userType.findUnique({
    where: { tipo: 'administrador' },
  });

  if (!adminUserType) {
    console.error('❌ Administrator UserType not found. Cannot create admin user.');
    process.exit(1);
  }

  const existingAdminUser = await prisma.usuario.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdminUser) {
    await prisma.usuario.create({
      data: {
        nome: 'Test Admin',
        email: adminEmail,
        senha_hash: hashedAdminPassword,
        user_type_id: adminUserType.id,
      },
    });
    console.log(`✅ Created Test Administrator: ${adminEmail}`);
  } else {
    console.log(`🔄 Test Administrator already exists: ${adminEmail}`);
  }

  // --- 2. Create 15 additional users (1 Mod, 14 Standard) ---
  console.log('🌱 Starting creation of 15 additional users...');

  // Get UserType IDs for moderator and standard users
  const moderatorUserType = await prisma.userType.findUnique({
    where: { tipo: 'moderador' },
  });
  const standardUserType = await prisma.userType.findUnique({
    where: { tipo: 'usuario_padrao' },
  });

  if (!moderatorUserType || !standardUserType) {
    console.error('❌ Standard or Moderator UserType not found. Cannot create additional users.');
    process.exit(1);
  }

  const commonPassword = 'password123'; // Common password for all test users
  const hashedCommonPassword = await hashPassword(commonPassword);

  for (let i = 1; i <= 15; i++) {
    const isModerator = (i === 1); // Make the first user a moderator
    const userEmail = `user${i}@example.com`;
    
    const userData = {
      nome: isModerator ? 'Test Moderator' : `Test User ${i}`,
      email: userEmail,
      senha_hash: hashedCommonPassword,
      user_type_id: isModerator ? moderatorUserType.id : standardUserType.id,
    };

    // Use upsert to prevent errors on re-seeding
    await prisma.usuario.upsert({
      where: { email: userEmail },
      update: {
        nome: userData.nome,
        user_type_id: userData.user_type_id,
      },
      create: userData,
    });

    console.log(`✅ Upserted User: ${userEmail}`);
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