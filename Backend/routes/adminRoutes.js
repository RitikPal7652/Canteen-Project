import express from "express";
import isAdmin from "../middlewares/isAdmin.js";
import { addFoodItem, getDashboardData } from '../controller/adminController.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get('/dashboard', isAuthenticated, isAdmin, getDashboardData);
router.post('/food/add', isAuthenticated, isAdmin, addFoodItem);

export default router;