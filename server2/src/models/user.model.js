import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
            required: [true, 'Full name is required'],
        },
        username: {
            type: String,
            trim: true,
            required: [true, 'Username is required'],
            unique: [true, 'Username already exists'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
            required: [true, 'Gender is required'],
        },
        profilePic: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);
export default User;
