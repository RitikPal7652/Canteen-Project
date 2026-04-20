import express from 'express';
import { authSignUp, authLogin, authCheckLogin, authLogout, authGoogle } from '../controller/authController.js';

const router = express.Router();

router.post('/signup', authSignUp)
router.post('/login', authLogin)
router.post('/google', authGoogle)
router.get('/me', authCheckLogin)
router.post('/logout', authLogout)

export default router