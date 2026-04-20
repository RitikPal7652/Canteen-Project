import FoodItem from "../models/Food_Items.js";

// Hardcoded default seed data to populate database automatically just in case it's completely empty.
const menuData = [
  {
    "name": "Classic Margherita Pizza",
    "varients": ["small", "medium", "large"],
    "Quantity": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Prices": [{"small": 200, "medium": 350, "large": 400}],
    "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
    "mealType": "Dinner"
  },
  {
    "name": "Vegetarian Stir-Fry",
    "varients": ["small", "medium", "large"],
    "Quantity": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Prices": [{"small": 200, "medium": 350, "large": 400}],
    "image": "https://cdn.dummyjson.com/recipe-images/2.webp",
    "mealType": "Lunch"
  },
  {
    "name": "Chocolate Chip Cookies",
    "varients": ["small", "medium", "large"],
    "Quantity": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Prices": [{"small": 200, "medium": 350, "large": 400}],
    "image": "https://cdn.dummyjson.com/recipe-images/3.webp",
    "mealType": "Snack"
  },
  {
    "name": "Chicken Alfredo Pasta",
    "varients": ["small", "medium", "large"],
    "Quantity": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Prices": [{"small": 200, "medium": 350, "large": 400}],
    "image": "https://cdn.dummyjson.com/recipe-images/4.webp",
    "mealType": "Dinner"
  },
  {
    "name": "Mango Salsa Chicken",
    "varients": ["small", "medium", "large"],
    "Quantity": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Prices": [{"small": 200, "medium": 350, "large": 400}],
    "image": "https://cdn.dummyjson.com/recipe-images/5.webp",
    "mealType": "Dinner"
  },
  {
    "name": "Quinoa Salad with Avocado",
    "varients": ["small", "medium", "large"],
    "Quantity": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Prices": [{"small": 200, "medium": 350, "large": 400}],
    "image": "https://cdn.dummyjson.com/recipe-images/6.webp",
    "mealType": "Side Dish"
  },
  {
    "name": "Classic Burger",
    "varients": ["small", "medium", "large"],
    "Quantity": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Prices": [{"small": 100, "medium": 150, "large": 200}],
    "image": "https://cdn.dummyjson.com/recipe-images/7.webp",
    "mealType": "Lunch"
  },
  {
    "name": "French Fries",
    "varients": ["regular", "large"],
    "Quantity": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Prices": [{"regular": 80, "large": 120}],
    "image": "https://cdn.dummyjson.com/recipe-images/8.webp",
    "mealType": "Snack"
  },
  {
    "name": "Cold Coffee",
    "varients": ["regular", "large"],
    "Quantity": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Prices": [{"regular": 120, "large": 160}],
    "image": "https://cdn.dummyjson.com/recipe-images/9.webp",
    "mealType": "Beverage"
  },
  {
    "name": "Paneer Tikka",
    "varients": ["half", "full"],
    "Quantity": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Prices": [{"half": 200, "full": 350}],
    "image": "https://cdn.dummyjson.com/recipe-images/10.webp",
    "mealType": "Starter"
  }
];

export const getFoodItems = async (req, res) => {
  try {
    let items = await FoodItem.find();

    // Auto seed Database if empty (very useful for the in-memory db fallback or a fresh Mongo Atlas cluster)
    if (items.length < 10) {
      console.log("Seeding Database array...");
      await FoodItem.deleteMany({});
      await FoodItem.insertMany(menuData);
      items = await FoodItem.find();
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food items", error: error.message });
  }
};
