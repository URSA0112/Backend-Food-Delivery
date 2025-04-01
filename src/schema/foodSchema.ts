import mongoose, { Schema } from 'mongoose';

const foodSchema = new Schema(
    {   _id: { type: String, required: false },
        foodName: { type: String, required: true },
        price: { type: Number, required: false },
        image: { type: String, required: false },
        ingredients: { type: String, required: false},
        category: {
            type: mongoose.Types.ObjectId,
             ref: 'category',
             required: false
            
        },
    },
    {
        timestamps: true,
    })
const Food = mongoose.model('Food', foodSchema);
export default Food