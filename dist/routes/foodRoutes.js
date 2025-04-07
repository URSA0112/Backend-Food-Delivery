"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodRouter = void 0;
const express_1 = __importDefault(require("express"));
const foodController_1 = require("../controller/foodController");
const foodRouter = express_1.default.Router();
exports.foodRouter = foodRouter;
foodRouter.post('/', foodController_1.createdFood)
    .get('/', foodController_1.getAllFood)
    .get('/:id', foodController_1.getFoodById)
    .patch('/:id', foodController_1.updateFoodById)
    .delete('/:id', foodController_1.deleteFoodById);
