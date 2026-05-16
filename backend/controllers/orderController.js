const Order = require('../models/Order');

// Create new order
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalPrice } = req.body;

    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const order = new Order({
        user: req.user._id, // Didapatkan dari middleware protect
        items,
        shippingAddress,
        totalPrice
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder
};
