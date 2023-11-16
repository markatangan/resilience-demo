import mongoose from 'mongoose';

const DBNAME = 'resilence-test';
const MONGODB_URI = 'mongodb://mongo:27017/' + DBNAME;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if the connection fails
  }
};

export default connectDB;
