"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controller/orderController");
const orderRouter = express_1.default.Router();
exports.orderRouter = orderRouter;
orderRouter.post('/', orderController_1.createOrder)
    .get('/', orderController_1.getAllOrder)
    .get('/:id', orderController_1.getOrderById)
    .patch('/:id', orderController_1.updateOrderById);
