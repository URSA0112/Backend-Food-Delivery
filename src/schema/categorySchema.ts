import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
    {
        id: { type: Schema.ObjectId },
        categoryName: { type: String, required: true }
    },
    {
        timestamps: true
    }
)
