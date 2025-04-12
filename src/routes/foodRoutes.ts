import express from 'express';
import { createdFood, getAllFood, getFoodById, deleteFoodById, updateFoodById } from '../controller/foodController';
import { checkTokenAdmin } from '../middleware/checkTokenAdmin';

const foodRouter = express.Router();

foodRouter.post('/', createdFood)
    .get('/', getAllFood)
    .get('/:id', getFoodById)
    .patch('/:id', checkTokenAdmin, updateFoodById)
    .delete('/:id',checkTokenAdmin, deleteFoodById)


export { foodRouter };  