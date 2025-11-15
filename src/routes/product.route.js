const express = require('express');
const { 
  getAllProducts, 
  getProductById, 
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require('../controllers/product.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/my-products', getMyProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
