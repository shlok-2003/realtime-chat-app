import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated - Invalid token',
            });
        }

        const user = await User.findById(decoded.userId).select('-password');
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated - User not found',
            });
        }

        req.user = user;
        next();
    }
    catch (error) {
        console.log('Error in verification of login: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};