import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        let { profilePic } = req.body;
        const { fullName, username, password, confirmPassword, gender } =
            req.body;

        if (
            !fullName ||
            !username ||
            !password ||
            !confirmPassword ||
            !gender
        ) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match',
            });
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists',
            });
        }

        if (!profilePic) {
            const label = gender === 'male' ? 'boy' : 'girl';
            profilePic = `https://avatar.iran.liara.run/public/${label}?username=${username}`;
        }

        //? Hash the password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            username,
            gender,
            password: hashedPassword,
            profilePic,
        });

        generateTokenAndSetCookie(res, newUser._id);

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUser,
            },
        });
    } catch (error) {
        console.log('Error signing up: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const user = await User.findOne({ username });
        const isCorrectPassword = await bcrypt.compare(
            password,
            user.password || '',
        ); //! if the user is not found, user.password will be undefined

        if (!user || !isCorrectPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid username or password',
            });
        }

        generateTokenAndSetCookie(res, user._id);

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                user,
            },
        });
    } catch (error) {
        console.log('Error login up: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');

    return res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
};
