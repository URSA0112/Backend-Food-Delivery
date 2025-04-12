import express from 'express';
import { getAllCategoriesWithFoods, createCategory, deleteCategoryById, getAllCategory, getCategoryById, updateCategoryById } from '../controller/categoryController';
import { checkTokenAdmin } from '../middleware/checkTokenAdmin';

const categoryRouter = express.Router()

categoryRouter.post('/', createCategory)
    .get('/', getAllCategory)
    .get('/with-foods', getAllCategoriesWithFoods)
    .get('/:id', getCategoryById)
    .patch('/:id', checkTokenAdmin, updateCategoryById)
    .delete('/:id', checkTokenAdmin, deleteCategoryById)

export { categoryRouter }