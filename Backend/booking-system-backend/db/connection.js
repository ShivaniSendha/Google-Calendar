// db/connection.js
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';

dotenv.config(); 

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/booking-system', {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully'); 
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    }
};

export default connectDB;
