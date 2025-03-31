
import Food from "../schema/foodSchema";
import { Request, Response } from 'express';

export const createdFood = async (req: Request, res: Response) => {
    try {
        const newfood = await Food.create(req.body);
        res.json({ success: true, food: newfood });
    } catch (error) {
        res.status(401).json({ success: false, message: error })
    }
}

