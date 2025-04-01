import Food from "../schema/foodSchema";
import { Request, Response } from 'express';

export const createdFood = async (req: Request, res: Response) => {
    try {
        const newfood = await Food.create(req.body);
        res.json({ success: true, food: newfood });
    } catch (error) {
        res.status(401).json({ success: false, message: error })
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
        res.status(200).json(food);

    } catch (error) {
        res.status(500).json({ success: false, message: `Error fetching food item: ${error}` });
        return
    }
};

export const getAllFood = async (req: Request, res: Response) => {
    try {
        const allFood = await Food.find()
        if (allFood.length === 0) {
            res.status(404).json({ success: false, message: 'Foods not found' });
            return;
        }
        res.status(200).json({
            succuss: true,
            all:allFood,
        })

    } catch (error) {
        res.status(500).json({ success: false, message: `Error fetching all food: ${error}` });
        return
    }
} 
 
// export const deleteFoodById = async (req:Request, res: Response)=>{
//     try {
//         const food = await Food.find()
//     }

// }

export const onefoodAdd = async (req: Request, res: Response) => {

        const food = await Food.create()
        res.json(food)
      
 }