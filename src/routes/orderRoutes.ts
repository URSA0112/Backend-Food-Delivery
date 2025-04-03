import express from 'express'
import { createOrder, getAllOrder, getOrderById, updateOrderById } from '../controller/orderController';

const orderRouter = express.Router();
orderRouter.post('/', createOrder)
    .get('/', getAllOrder)
    .get('/:id', getOrderById)
    .patch('/:id', updateOrderById)

export { orderRouter }