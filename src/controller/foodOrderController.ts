import { Request, Response } from 'express';
import FoodOrder from '../schema/orderSchema';


export const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder = await FoodOrder.create(req.body);
        res.status(201).json({
            success: true, 
            message: `New FoodOrder added `,
            data: newOrder,
        }
        );
    } catch (error: any) {
        console.error('Create FoodOrder error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create FoodOrder',
        })
    }
}
//get BY id (READ)
export const getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const order = await FoodOrder.findById(id)
            .populate('Category')
        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `Error fetching Order : ${error.message}`
        });
        return
    }
};

//get All (READ)
export const getAllOrder = async (req: Request, res: Response) => {
    try {
        const allOrder = await FoodOrder.find()
        if (allOrder.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No any Food Order in data'
            });
            return;
        }
        res.status(200).json({
            succuss: true,
            data: allOrder,
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `Error fetching all Food Order: ${error.message}`
        });
        return
    }
}

//update
export const updateFoodById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatingOrder = req.body
    try {
        if (Object.keys(updatingOrder).length === 0) {
            res.status(400).json({
                success: false,
                message: 'No update data provided'
            });
            return;
        }
        const oldOrder = await FoodOrder.findById(id);
        if (!oldOrder) {
            res.status(404).json({
                success: false,
                message: 'Order not found'
            });
            return
        }
        const updatedOrder = await FoodOrder.findByIdAndUpdate(id, updatingOrder, { new: true })

        if (!updatedOrder) {
            res.status(404).json({
                success: false,
                message: 'Order not found'
            });
            return
        }
        res.status(200).json({
            success: true,
            message: `Order with ID - ${id} successfully updated`,
            data: updatingOrder
        })

    } catch (error: any) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`
        })
    }
}