import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js'

//? SETUP
const router = express.Router();

//? ROUTES
router.get('/:id', isLoggedIn, getMessages);
router.post('/send/:id', isLoggedIn, sendMessage);

export default router;
