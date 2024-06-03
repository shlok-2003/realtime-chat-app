import User from '../models/user.model.js'

export const getUsersFromSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        return res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.log('Error getting users from sidebar: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}