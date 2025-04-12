import mongoose, { Schema } from "mongoose";
import { UserRoleEnum } from "../enums/userRoleEnum";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    role: {
        type: String,
        enum: Object.values(UserRoleEnum),
        required: true
    },
    orderedFoods: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    isVerified: { type: Boolean },
},
    {
        timestamps: true,
    })

const User = mongoose.model('users', userSchema)
export default User