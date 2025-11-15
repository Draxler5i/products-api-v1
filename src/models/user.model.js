const { prisma } = require('../config/database');

const createUser = async (userData) => {
  return await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });
};

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
