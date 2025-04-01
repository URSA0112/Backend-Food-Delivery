import express from 'express';
import { createdFood, getAllFood, getFoodById ,deleteFoodById} from '../controller/foodController';

const foodRouter = express.Router();

foodRouter.post('/', createdFood);
foodRouter.get('/:id', getFoodById);
foodRouter.get('/', getAllFood);
foodRouter.delete('/:id',deleteFoodById)

export { foodRouter };  