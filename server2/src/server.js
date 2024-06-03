import dotenv from 'dotenv';
import app from './app.js';
import dbConfig from './config/mongodb.config.js';

//? SETUP
dotenv.config();
const PORT = process.env.PORT || 4001;

//? SERVER
app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting server: ', error);
        console.log('Error starting server: ', error);
        process.exit(1);
    }

    dbConfig();
    console.log(`Server running on port ${PORT}`);
});
