import mongoose from "mongoose";
import User from "../../../entities/user.js";

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "Please provide your first name"],
        },
        last_name: {
            type: String,
            required: [true, "Please provide your last name"],
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "Please provide your email"],
        },
        phone: {
            type: String,
        },
        gender: {
            type: String,
            enum: Object.values(User.GENDER),
        },
        date_of_birth: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            select: false,
        },
        status: {
            type: String,
            default: User.STATUS.PENDING,
            enum: Object.values(User.STATUS),
        },
    },
    {
        id: true,
        timestamps: true,
        minimize: false,
        virtuals: {
            created_at: {
                get() {
                    return this.createdAt;
                },
            },
            updated_at: {
                get() {
                    return this.updatedAt;
                },
            },
        },
    },
);

export default mongoose.model("User", userSchema);
