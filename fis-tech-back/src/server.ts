import app from './app';
import { PrismaClient } from './generated/prisma/client.js';
import { config } from './config/environment';
import { loadPermissionsFromDB } from './utils/permissions';

const prisma = new PrismaClient();

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

const server = app.listen(config.port, async () => {
  console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  try {
    await prisma.$connect();
    console.log('Connected to database');
    
    // Carregar permissões do banco de dados
    await loadPermissionsFromDB();
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    prisma.$disconnect().then(() => {
      console.log('Server and database connection closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    prisma.$disconnect().then(() => {
      console.log('Server and database connection closed');
      process.exit(0);
    });
  });
});