import FoodItem from "../models/Food_Items.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

export const getDashboardData = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const orders = await Order.find().populate('user', 'username email');
    const foodItems = await FoodItem.find();

    res.status(200).json({
      success: true,
      data: {
        users,
        orders,
        foodItems
      }
    });
  } catch(err) {
    console.log('Error fetching dashboard data', err);
    res.status(500).json({message: "Server Error fetching dashboard"})
  }
};

export const addFoodItem = async (req, res) => {
  try {
    const {name, image, Prices, mealType, varients, Quantity} = req.body;
    
    const newFood = new FoodItem({
      name,
      image,
      Prices,
      mealType,
      varients,
      Quantity
    });

    await newFood.save();
    res.status(201).json({
      message: "Food Item added successfully",
      data: newFood
    });
  } catch(err) {
    console.log('Error while adding food items', err.message);
    res.status(500).json({message: "Server Error while adding food items"})
  }
}