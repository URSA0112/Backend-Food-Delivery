import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';  // Import the DB connection

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware for parsing JSON
app.use(express.json());

// MongoDB connection
connectDB();

// Sample data
const data = [
  { id: '11', item: 'Pizza', quantity: 2, address: '123 Street', status: 'Pending' },
  { id: '22', item: 'Molo', quantity: 1, address: '321 Street', status: 'Ready' },
];

// API route to fetch data by ID
app.get('/data/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const response = data.find(each => each.id === id);

  if (!response) {
    res.status(404).json({ message: 'No data found' });
  } else {
    res.json(response);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});