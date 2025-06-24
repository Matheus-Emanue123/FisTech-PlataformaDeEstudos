import app from './app';
import { PrismaClient } from './generated/prisma/client.js';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await prisma.$connect();
    console.log('Connected to database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  server.close(() => {
    prisma.$disconnect().then(() => {
      console.log('Server and database connection closed');
      process.exit(0);
    });
  });
});