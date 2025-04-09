import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { foodRouter } from './routes/foodRoutes';
import { categoryRouter } from './routes/categoryRoutes';
import { orderRouter } from './routes/orderRoutes';
import cors from 'cors'; 



dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use('/api/v1/food', foodRouter);
app.use('/api/v1/category', categoryRouter)
app.use('api/v1/order', orderRouter)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });



