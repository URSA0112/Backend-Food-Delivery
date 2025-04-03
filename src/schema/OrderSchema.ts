import mongoose, { Schema } from 'mongoose';
import { FoodOrderStatusEnum } from '../enums/orderStatusEnum';
import { FoodOrderItemSchema } from './sub-schema/foodOrderItemSchema';

const FoodOrderSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        totalPrice: { type: Number, required: true },
        foodOrderItems: [FoodOrderItemSchema],
        status: {
            type: String,
            enum: Object.values(FoodOrderStatusEnum),
            default: FoodOrderStatusEnum.PENDING
        },
    },
    { timestamps: true }
)

const FoodOrder = mongoose.model('foodOrders', FoodOrderSchema);
export default FoodOrder