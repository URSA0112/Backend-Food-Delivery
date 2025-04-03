import express from 'express';
import { getAllCategoriesWithFoods, createCategory, deleteCategoryById, getAllCategory, getCategoryById, updateCategoryById } from '../controller/categoryController';

const categoryRouter = express.Router()

categoryRouter.post('/', createCategory)
    .get('/', getAllCategory)
    .get('/with-foods', getAllCategoriesWithFoods)
    .get('/:id', getCategoryById)
    .patch('/:id', updateCategoryById)
    .delete('/:id', deleteCategoryById)

export { categoryRouter }