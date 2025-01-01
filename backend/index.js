import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
// Load environment variables
dotenv.config();

const app = express();
//allows backend to take input as json
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//creating API routes
app.use("/backend/user",userRoutes);
app.use("/backend/auth",authRoutes);


//middleware for erros  handling
//we are basically returning the errors in a presentable format
app.use((err, req, res, next) => {
    //we get statuscodes from error and 500 is internal server error 
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    })
});