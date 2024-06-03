import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
//? SETUP
const router = express.Router();

//? ROUTES
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', isLoggedIn, logout);

export default router;
