import Food from "../schema/foodSchema";
import { Request, Response } from 'express';

export const createdFood = async (req: Request, res: Response) => {
    try {
        const newfood = await Food.create(req.body);
        res.status(201).json({ success: true, data: newfood });
    } catch (error: any) {
        console.error('Create food error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create food',
        })

    }
};

export const getFoodById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const food = await Food.findById(id);
        if (!food) {
            res.status(404).json({ success: false, message: 'Food item not found' });
            return;
        }
        res.status(200).json({ success: true, data: food });

    } catch (error: any) {
        res.status(500).json({ success: false, message: `Error fetching food item: ${error.message}` });
        return
    }
};

export const getAllFood = async (req: Request, res: Response) => {
    try {
        const allFood = await Food.find()
        if (allFood.length === 0) {
            res.status(404).json({ success: false, message: 'No any Foods in data' });
            return;
        }
        res.status(200).json({
            succuss: true,
            data: allFood,
        })

    } catch (error:any) {
        res.status(500).json({ success: false, message: `Error fetching all food: ${error.message}` });
        return
    }
}

export const deleteFoodById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const food = await Food.findOneAndDelete({ _id: id })
        if (!food) {
            res.status(404).json({ success: false, message: 'Food not found' });
            return
        }
        res.status(200).json({ success: true, data: food });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error ${error.message}` })
    }

}

