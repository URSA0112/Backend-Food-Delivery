import express from 'express';
import { createdFood, getAllFood, getFoodById, deleteFoodById, updateFoodById } from '../controller/foodController';

const foodRouter = express.Router();

foodRouter.post('/', createdFood)
    .get('/:id', getFoodById)
    .get('/', getAllFood)
    .patch('/:id', updateFoodById)
    .delete('/:id', deleteFoodById)

export { foodRouter };  