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
exports.deleteFoodById = exports.updateFoodById = exports.getAllFood = exports.getFoodById = exports.createdFood = void 0;
const foodSchema_1 = __importDefault(require("../schema/foodSchema"));
//create
const createdFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newfood = yield foodSchema_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: `New food added `,
            data: newfood,
        });
    }
    catch (error) {
        console.error('Create food error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create food',
        });
    }
});
exports.createdFood = createdFood;
//get BY id (READ)
const getFoodById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const food = yield foodSchema_1.default.findById(id)
            .populate('Category');
        if (!food) {
            res.status(404).json({
                success: false,
                message: 'Food item not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: food
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error fetching food item: ${error.message}`
        });
        return;
    }
});
exports.getFoodById = getFoodById;
//get All (READ)
const getAllFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allFood = yield foodSchema_1.default.find();
        if (allFood.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No any Foods in data'
            });
            return;
        }
        res.status(200).json({
            succuss: true,
            data: allFood,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error fetching all food: ${error.message}`
        });
        return;
    }
});
exports.getAllFood = getAllFood;
//update
const updateFoodById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newFood = req.body;
    try {
        if (Object.keys(newFood).length === 0) {
            res.status(400).json({
                success: false,
                message: 'No update data provided'
            });
            return;
        }
        const oldFood = yield foodSchema_1.default.findById(id);
        if (!oldFood) {
            res.status(404).json({
                success: false,
                message: 'Category not found'
            });
            return;
        }
        const updatedFood = yield foodSchema_1.default.findByIdAndUpdate(id, newFood, { new: true });
        if (!updatedFood) {
            res.status(404).json({
                success: false,
                message: 'Category not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: `Food ${oldFood.foodName.toUpperCase()} with ID ${id} successfully updated`,
            data: newFood
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
exports.updateFoodById = updateFoodById;
//Delete 
const deleteFoodById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const food = yield foodSchema_1.default.findByIdAndDelete({ _id: id });
        if (!food) {
            res.status(404).json({
                success: false,
                message: 'Food not found'
            });
            return;
        }
        res.status(200).json({ success: true, data: food });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: `Server error ${error.message}`
        });
    }
});
exports.deleteFoodById = deleteFoodById;
