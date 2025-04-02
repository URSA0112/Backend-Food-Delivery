import mongoose, { Schema } from "mongoose";

export const FoodOrderItemSchema = new Schema(
    {
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required : false,
        }
    }
)
// no model needed