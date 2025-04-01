import mongoose, { Schema } from 'mongoose';

const foodSchema = new Schema(
    {   
        foodName: { type: String, required: true,},
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
const Food = mongoose.model('Foods', foodSchema);
export default Food
