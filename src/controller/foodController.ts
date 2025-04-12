import Food from "../schema/foodSchema";
import { Request, Response } from 'express';

//create
export const createdFood = async (req: Request, res: Response) => {
    try {
        const newfood = await Food.create(req.body);
         res.status(201).json({
            success: true,
            message: `New food added `,
            data: newfood,
        });
    } catch (error: any) {
        console.error('Create food error:', error);
res.status(400).json({
            success: false,
            message: error.message || 'Failed to create food',
        })
    }
};

//get BY id (READ)
export const getFoodById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const food = await Food.findById(id)
            .populate('Category')
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

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `Error fetching food item: ${error.message}`
        });
        return
    }
};

//get All (READ)
export const getAllFood = async (req: Request, res: Response) => {
    try {
        const allFood = await Food.find()
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
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `Error fetching all food: ${error.message}`
        });
        return
    }
}

//update
export const updateFoodById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newFood = req.body
    try {
        if (Object.keys(newFood).length === 0) {
            res.status(400).json({
                success: false,
                message: 'No update data provided'
            });
            return;
        }
        const oldFood = await Food.findById(id);
        if (!oldFood) {
            res.status(404).json({
                success: false,
                message: 'Category not found'
            });
            return
        }

        const updatedFood = await Food.findByIdAndUpdate(id, newFood, { new: true })

        if (!updatedFood) {
            res.status(404).json({
                success: false,
                message: 'Category not found'
            });
            return
        }
        res.status(200).json({
            success: true,
            message: `Food ${oldFood.foodName.toUpperCase()} with ID ${id} successfully updated`,
            data: newFood
        })

    } catch (error: any) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`
        })
    }
}
//Delete 
export const deleteFoodById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const food = await Food.findByIdAndDelete({ _id: id })
        if (!food) {
            res.status(404).json({
                success: false,
                message: 'Food not found'
            });
            return
        }
        res.status(200).json({ success: true, data: food });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: `Server error ${error.message}`
        })
    }
}

