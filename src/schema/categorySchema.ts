import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
    {
        id: { type: mongoose.Types.ObjectId },
        categoryName: { type: String, required: true }
    },
    {
        timestamps: true
    }
)
