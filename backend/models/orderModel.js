import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "card", "online"],
        default: "cash"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;