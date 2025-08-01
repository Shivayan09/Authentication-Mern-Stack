import mongoose from "mongoose";

const connectDB = async() => {
    mongoose.connection.on('connected', () => console.log("Database connected!"));
    await mongoose.connect(`${process.env.MONGO_URI}/auth-mern2`);
}

export default connectDB;