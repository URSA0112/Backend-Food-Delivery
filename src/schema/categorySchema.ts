import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
    {
        categoryName: { type: String, required: true }
    },
    {
        timestamps: true
    }
)
const Category = mongoose.model('categories', categorySchema)
export default Category