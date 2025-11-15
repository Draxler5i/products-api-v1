const productService = require('../services/product.service');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error getting products',
      message: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: 'Product not found',
      message: error.message
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    const product = await productService.createProduct(
      { name, description, price },
      req.user.userId
    );
    
    res.status(201).json({
      success: true,
      message: 'Product created',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Error creating product',
      message: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    if (!name && !description && !price) {
      return res.status(400).json({
        success: false,
        error: 'There are no fields to update'
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;

    const product = await productService.updateProduct(
      id, 
      updateData, 
      req.user.userId
    );
    
    res.status(200).json({
      success: true,
      message: 'Product updated',
      data: product
    });

  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.name,
      message: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProduct(id, req.user.userId);
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: { id: result.id }
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.name || 'InternalServerError',
      message: error.message || 'An unexpected error occurred'
    });
  }
};


const getMyProducts = async (req, res) => {
  try {
    const products = await productService.getProductsByUser(req.user.userId);
    
    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error getting your products',
      message: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
};
