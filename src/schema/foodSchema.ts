import mongoose, { Schema } from 'mongoose';

const foodSchema = new Schema(
    {   
        foodName: { type: String, required: true,},
        price: { type: Number, required: false },
        image: { type: String, required: false },
        ingredients: { type: String, required: false},
        category: {
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Category',
             required: true,
            
        },
    },
    {
        timestamps: true,
    })
const Food = mongoose.model('foods', foodSchema);
export default Food
