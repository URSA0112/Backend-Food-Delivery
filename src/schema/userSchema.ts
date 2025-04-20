import mongoose, { Schema, Document } from "mongoose";
import { UserRoleEnum } from "../enums/userRoleEnum";


interface IUser extends Document {
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
    role: UserRoleEnum;
    orderedFoods: mongoose.Schema.Types.ObjectId;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}


const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    role: {
        type: String,
        enum: Object.values(UserRoleEnum),
        required: false,
        default: UserRoleEnum.USER,
    },
    orderedFoods: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    isVerified: { type: Boolean },
}, {
    timestamps: true,  
});


const User = mongoose.model<IUser>('User', userSchema);

export default User;