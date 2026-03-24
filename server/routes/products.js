const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filtering and sorting
router.get('/', async (req, res) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      minRating,
      search,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    // Build query
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (brand) {
      if (Array.isArray(brand)) {
        query.brand = { $in: brand };
      } else {
        query.brand = brand;
      }
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Build sort object
    const sortOptions = {};
    sortOptions[sort] = order === 'asc' ? 1 : -1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total,
        hasNext: parseInt(page) < Math.ceil(total / parseInt(limit)),
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12, sort = 'createdAt', order = 'desc' } = req.query;

    const sortOptions = {};
    sortOptions[sort] = order === 'asc' ? 1 : -1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find({ category })
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments({ category });

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total
      }
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Error fetching products by category' });
  }
});

// Get featured products (deals)
router.get('/featured/deals', async (req, res) => {
  try {
    const products = await Product.find({ price: { $lt: 1500 } })
      .sort({ rating: -1 })
      .limit(8);

    res.json({ products });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Error fetching featured products' });
  }
});

// Get product categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    
    res.json({
      categories: categories.map(cat => ({
        name: cat,
        displayName: cat.charAt(0).toUpperCase() + cat.slice(1)
      })),
      brands
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Create new product (admin only)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
});

// Update product (admin only)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete product (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
