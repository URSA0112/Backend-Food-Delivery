import express from 'express';
import { createdFood, getAllFood, getFoodById } from '../controller/foodController';

const foodRouter = express.Router();

foodRouter.post('/', createdFood);
foodRouter.get('/:id', getFoodById);
foodRouter.get('/', getAllFood)
export { foodRouter };  