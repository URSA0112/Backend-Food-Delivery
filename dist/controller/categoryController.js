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
exports.getAllCategoriesWithFoods = exports.deleteCategoryById = exports.updateCategoryById = exports.getAllCategory = exports.getCategoryById = exports.createCategory = void 0;
const categorySchema_1 = __importDefault(require("../schema/categorySchema"));
//create
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = yield categorySchema_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: ` ${newCategory.categoryName} has been added to the Category.`
        });
    }
    catch (error) {
        console.error('Category error', error),
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to create category',
            });
    }
});
exports.createCategory = createCategory;
//get by id
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getCategory = yield categorySchema_1.default.findById(id);
        if (!getCategory) {
            res.status(404).json({ success: false, message: 'Category not found' });
            return;
        }
        res.status(200).json({ success: true, data: getCategory, message: `${getCategory.categoryName} successfully fetched` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error ${error.message}` });
    }
});
exports.getCategoryById = getCategoryById;
//get all
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategory = yield categorySchema_1.default.find();
        if (allCategory.length === 0) {
            res.status(404).json({
                success: false,
                message: "Any category not found"
            });
            return;
        }
        res.status(200).json({ success: true, data: allCategory });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            succes: false,
            message: `Server error ${error.message}`
        });
    }
});
exports.getAllCategory = getAllCategory;
//update 
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newCategory = req.body;
    try {
        if (Object.keys(newCategory).length === 0) {
            res.status(400).json({ success: false, message: 'No update data provided' });
            return;
        }
        const oldCategory = yield categorySchema_1.default.findById(id);
        if (!oldCategory) {
            res.status(404).json({ success: false, message: 'Category not found' });
            return;
        }
        const updatedCategory = yield categorySchema_1.default.findByIdAndUpdate(id, newCategory, { new: false });
        if (!updatedCategory) {
            res.status(404).json({ success: false, message: 'Category not found' });
            return;
        }
        res.status(200).json({
            success: true,
            message: `Category ${oldCategory.categoryName.toUpperCase()} with ID ${id} successfully updated`,
            oldData: updatedCategory
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
});
exports.updateCategoryById = updateCategoryById;
//delete
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletingCategory = yield categorySchema_1.default.findOneAndDelete({ _id: id });
        if (!deletingCategory) {
            res.status(404).json({ success: false, message: 'Category not found' });
            return;
        }
        res.status(200).json({
            success: true,
            message: `${deletingCategory.categoryName} successfully deleted`
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error ${error.message}` });
    }
});
exports.deleteCategoryById = deleteCategoryById;
// get 2 collection together (FOOD in Category)
const getAllCategoriesWithFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categorySchema_1.default.aggregate([
            {
                $lookup: {
                    from: "foods",
                    localField: "_id",
                    foreignField: "category",
                    as: "foods"
                }
            }
        ]);
        if (categories.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No categories found or no foods available in categories.'
            });
            return;
        }
        res.status(200).json({ success: true, categories });
    }
    catch (error) {
        console.error('Error fetching categories with foods:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching categories and foods. Please try again later.',
            error: error.message || error
        });
    }
});
exports.getAllCategoriesWithFoods = getAllCategoriesWithFoods;
