import mongoose from "mongoose";
import Payment from "../../../entities/payment.js";

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user"],
        },
        amount: {
            type: Number,
            required: [true, "Please provide an amount"],
        },
        currency: {
            type: String,
            default: Payment.DEFAULT_CURRENCY,
            enum: Object.values(Payment.CURRENCY),
        },
        status: {
            type: String,
            default: Payment.STATUS.PENDING,
            enum: Object.values(Payment.STATUS),
        },
        service_ref: {
            type: String,
            default: "",
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

export default mongoose.model("Payment", paymentSchema);
