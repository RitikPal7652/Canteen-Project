import express from 'express';
import { getFoodItems } from '../controller/foodController.js';

const router = express.Router();

router.get('/', getFoodItems);

export default router;
