const productModel = require('../models/product.model');
const { NotFoundError, ForbiddenError, BadRequestError } = require('../error/Errors');

const getAllProducts = async () => {
  return await productModel.getAllProducts();
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) {
    throw new NotFoundError('Product not found');
  }
  return product;
};

const createProduct = async (productData, userId) => {
  if (isNaN(productData.price) || productData.price <= 0) {
    throw new Error('Introduce a positive number in price');
  }

  return await productModel.createProduct({
    ...productData,
    created_by: userId
  });
};

const updateProduct = async (id, productData, userId) => {
  const existingProduct = await productModel.getProductById(id);
  if (!existingProduct) {
    throw new NotFoundError('Product not found');
  }

  if (existingProduct.createdBy !== userId) {
    throw new ForbiddenError('You cannot update this product');
  }

  if (productData.price && (isNaN(productData.price) || productData.price <= 0)) {
    throw new BadRequestError('Price must be a positive number');
  }

   const updatedProduct = {
    name: productData.name ?? existingProduct.name,
    description: productData.description ?? existingProduct.description,
    price: productData.price ?? existingProduct.price
  };
  
  return await productModel.updateProduct(id, updatedProduct);
};

const deleteProduct = async (id, userId) => {
  const existingProduct = await productModel.getProductById(id);
  if (!existingProduct) {
    throw new NotFoundError('Product not found');
  }

  if (existingProduct.createdBy !== userId) {
    throw new ForbiddenError('You cannot update this product');
  }

  return await productModel.deleteProduct(id);
};

const getProductsByUser = async (userId) => {
  return await productModel.getProductsByUser(userId);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByUser,
};
