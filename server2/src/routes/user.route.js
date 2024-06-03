import express from 'express';
import { getUsersFromSidebar } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

//? SETUP
const router = express.Router();

//? ROUTES
router.get('/users', isLoggedIn, getUsersFromSidebar);

export default router;
