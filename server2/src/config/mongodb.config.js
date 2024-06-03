import mongoose from 'mongoose';
import dotenv from 'dotenv';

//? SETUP
dotenv.config();

const dbConfig = async () => {
    mongoose.set('strictQuery', true);

    await mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => {
            console.log('Error connecting to MongoDB: ', error);
            process.exit(1);
        });
};

export default dbConfig;
