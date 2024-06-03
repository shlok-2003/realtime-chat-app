import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import conversationRoutes from './routes/user.route.js';

//? SETUP
dotenv.config(); //? Load environment variables
const app = express();
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};

//? MIDDLEWARES
app.use(express.json()); //? Parse JSON bodies
app.use(express.urlencoded({ extended: true })); //? Parse URL-encoded bodies
app.use(cookieParser()); //? Parse cookie headers
app.use(cors(corsOptions)); //? Enable CORS
app.use(morgan('dev')); //? Log HTTP requests

const BASE_URL = '/api/v1';
app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/messages`, messageRoutes);
app.use(`${BASE_URL}/sidebar`, conversationRoutes);

app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API Not Found | Error 404',
    });
});

export default app;
