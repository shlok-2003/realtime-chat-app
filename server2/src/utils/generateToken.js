import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
};

export default generateTokenAndSetCookie;
