import mongoose from 'mongoose';
import dotenv from'dotenv';

dotenv.config();

export async function dbConnect(){
    console.log(process.env.MONGODB_URI)
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connected successfully!!!');
    } catch (error) {
        console.log(`Error happened while connecting to DB ${error.message}`);
    }
}