import mongoose, { Schema, Document } from "mongoose";
import { UserRoleEnum } from "../enums/userRoleEnum";

// Define TypeScript interface for the User schema
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

// Define the schema for the user
const userSchema = new Schema<IUser>({
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
}, {
    timestamps: true,  // This will automatically add `createdAt` and `updatedAt` fields
});

// Create and export the User model based on the schema and interface
const User = mongoose.model<IUser>('User', userSchema);

export default User;