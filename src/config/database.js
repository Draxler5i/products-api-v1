const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty'
});

const connectDB = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connected');
    
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log('🔌 Desconectado de la base de datos');
  } catch (error) {
    console.error('❌ Error al desconectar:', error.message);
  }
};

module.exports = {
  prisma,
  connectDB,
  disconnectDB,
};
