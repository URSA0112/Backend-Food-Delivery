"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controller/categoryController");
const checkTokenAdmin_1 = require("../middleware/checkTokenAdmin");
const categoryRouter = express_1.default.Router();
exports.categoryRouter = categoryRouter;
categoryRouter.post('/', categoryController_1.createCategory)
    .get('/', categoryController_1.getAllCategory)
    .get('/with-foods', categoryController_1.getAllCategoriesWithFoods)
    .get('/:id', categoryController_1.getCategoryById)
    .patch('/:id', checkTokenAdmin_1.checkTokenAdmin, categoryController_1.updateCategoryById)
    .delete('/:id', checkTokenAdmin_1.checkTokenAdmin, categoryController_1.deleteCategoryById);
