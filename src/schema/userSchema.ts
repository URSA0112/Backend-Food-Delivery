import mongoose, { Schema } from "mongoose";
import { UserRoleEnum } from "../enums/userRoleEnum";

const userSchema = new Schema({
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: UserRoleEnum },
    orderedFoods: { type: mongoose.Schema.Types.ObjectId, ref :'Food' },
    isVerified: { type: Boolean },
},
    {
        timestamps: true,
    })

    const User = mongoose.model('user', userSchema)
    export default User