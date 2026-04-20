import Order from "../models/Order.js";

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;
    
    // We get the user ID from the isAuthenticated middleware
    const userId = req.user._id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in the order." });
    }

    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount is required." });
    }

    // Verify payment logic or setup a mock. 
    // Usually here you'd call Razorpay/Stripe, but for now we just process it.

    const newOrder = await Order.create({
      user: userId,
      items,
      totalAmount,
      paymentMethod: paymentMethod || 'cash',
      status: "pending"
    });

    res.status(201).json({ 
      success: true,
      message: "Order placed successfully! Payment mock authorized.", 
      order: newOrder 
    });

  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ success: false, message: "Error placing order", error: error.message });
  }
};

// Get orders for the current user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
  }
};
