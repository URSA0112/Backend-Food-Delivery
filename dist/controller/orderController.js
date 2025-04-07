"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderById = exports.getAllOrder = exports.getOrderById = exports.createOrder = void 0;
const orderSchema_1 = __importDefault(require("../schema/orderSchema"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield orderSchema_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: `New FoodOrder added `,
            data: newOrder,
        });
    }
    catch (error) {
        console.error('Create FoodOrder error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create FoodOrder',
        });
    }
});
exports.createOrder = createOrder;
//get BY id (READ)
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield orderSchema_1.default.findById(id)
            .populate('Category');
        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: order
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error fetching Order : ${error.message}`
        });
        return;
    }
});
exports.getOrderById = getOrderById;
//get All (READ)
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrder = yield orderSchema_1.default.find();
        if (allOrder.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No any Food Order in data'
            });
            return;
        }
        res.status(200).json({
            succuss: true,
            data: allOrder,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error fetching all Food Order: ${error.message}`
        });
        return;
    }
});
exports.getAllOrder = getAllOrder;
//update
const updateOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatingOrder = req.body;
    try {
        if (Object.keys(updatingOrder).length === 0) {
            res.status(400).json({
                success: false,
                message: 'No update data provided'
            });
            return;
        }
        const oldOrder = yield orderSchema_1.default.findById(id);
        if (!oldOrder) {
            res.status(404).json({
                success: false,
                message: 'Order not found'
            });
            return;
        }
        const updatedOrder = yield orderSchema_1.default.findByIdAndUpdate(id, updatingOrder, { new: true });
        if (!updatedOrder) {
            res.status(404).json({
                success: false,
                message: 'Order not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: `Order with ID - ${id} successfully updated`,
            data: updatingOrder
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`
        });
    }
});
exports.updateOrderById = updateOrderById;
