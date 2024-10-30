const router = require('express').Router();
const Product = require('../models/product.model');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// List products
router.get('/', async (req, res) => {
  try {
    const { category, animalType, page = 1, limit = 10 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (animalType) query.animalType = animalType;

    const products = await Product.find(query)
      .limit(limit)
      .skip((page - 1) * limit);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product details
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;