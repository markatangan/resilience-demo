import express from 'express';
import bodyParser from 'body-parser';
import sampleRoutes from './routes/resilienceRoutes';
import connectDB from './connection_provider/mongoose.connection.provider'; // Import the connectDB function

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', sampleRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
