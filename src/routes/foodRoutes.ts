import express from 'express';
import { createdFood } from '../controller/food';


const foodRouter = express.Router();
 foodRouter.post('/', createdFood);
 export {foodRouter};  