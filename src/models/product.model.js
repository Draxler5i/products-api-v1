const { prisma } = require('../config/database');

const getAllProducts = async () => {
  return await prisma.product.findMany({
    where: { active: true },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

const getProductById = async (id) => {
  return await prisma.product.findFirst({
    where: { 
      id: parseInt(id),
      active: true 
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

const createProduct = async (productData) => {
  return await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      createdBy: productData.created_by
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

const updateProduct = async (id, productData) => {
  return await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price)
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

const deleteProduct = async (id) => {
  return await prisma.product.update({
    where: { id: parseInt(id) },
    data: { active: false },
    select: { id: true }
  });
};

const getProductsByUser = async (userId) => {
  return await prisma.product.findMany({
    where: { 
      createdBy: parseInt(userId),
      active: true 
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByUser
};
