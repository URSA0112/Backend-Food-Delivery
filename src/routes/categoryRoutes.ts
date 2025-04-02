import express from 'express';
import { createCategory, deleteCategoryById, getAllCategory, getCategoryById, updateCategoryById} from '../controller/categoryController';

const categoryRouter = express.Router()

categoryRouter.post('/', createCategory)
    .get('/', getAllCategory)
    .get('/:id', getCategoryById)
    .patch('/:id', updateCategoryById)
    .delete('/:id', deleteCategoryById)
 


export { categoryRouter }