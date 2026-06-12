const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

// ---------------- GET CART ----------------
router.get('/', auth, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Cart is handled in frontend with localStorage',
      data: {
        items: [],
        totalAmount: 0
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ---------------- SAVE CART ----------------
router.post('/save', auth, async (req, res) => {
  try {
    const { items } = req.body;

    res.status(200).json({
      success: true,
      message: 'Cart saved successfully',
      data: items
    });
  } catch (error) {
    console.error('Save cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
