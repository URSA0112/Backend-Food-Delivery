import express from 'express'
import { createOrder, getAllOrder, getOrderById, updateOrderById } from '../controller/orderController';

const orderRouter = express.Router();
orderRouter.post('/', createOrder)
    .get('/:id', getOrderById)
    .get('/', getAllOrder)
    .patch('/:id', updateOrderById)

export { orderRouter }