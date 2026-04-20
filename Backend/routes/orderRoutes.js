import express from 'express';
import { placeOrder, getUserOrders } from '../controller/orderController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/place', isAuthenticated, placeOrder);
router.get('/my-orders', isAuthenticated, getUserOrders);

export default router;
