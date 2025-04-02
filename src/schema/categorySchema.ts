import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
    {
        categoryName: { type: String, required: true }
    },
    {
        timestamps: true
    }
)
const Category = mongoose.model('category', categorySchema)
export default Category