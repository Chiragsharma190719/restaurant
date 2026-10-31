import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// Place Order
export const placeOrder = async (req, res) => {
    try{
        const {id} = req.user;
        const {address} = req.body;
        if(!address){
            return res.status(400).json({ message: "Address is required", success: false });
        }
        const cart = await Cart.findOne({user: id}).populate("items.menuItem");
        if(!cart || cart.items.length === 0){
            return res.status(404).json({ message: "Your cart is empty", success: false });
        }
        const totalAmount = cart.items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

        const newOrder = await Order.create({
            user: id,
            items: cart.items.map((i) => ({
                menuItem: i.menuItem._id,
                quantity: i.quantity
            })),
            totalAmount,
            address
        });

        // Clear Cart
        cart.items = [];
        await cart.save();
        
        res.status(201).json({ message: "Order placed successfully", success: true, order: newOrder });
    } catch (error) {
        console.error("placeOrder error:", error);
        res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}

// Get Orders
export const getUserOrders = async (req, res) => {
    try{
        const {id} = req.user;
        const orders = await Order.find({user: id}).sort({createdAt: -1});
        res.status(200).json({ message: "Orders fetched successfully", success: true, orders });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

// Get All Orders
export const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find().populate("user").populate("items.menuItem").sort({createdAt: -1});
        res.status(200).json({ message: "Orders fetched successfully", success: true, orders });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

// Update Order Status
export const updateOrderStatus = async (req, res) => {
    try{
        const {orderId} = req.params;
        const {status} = req.body;
        const allowedStatuses = ["pending", "confirmed", "preparing", "delivered", "cancelled"];
        const normalizedStatus = status?.toLowerCase();
        if (!normalizedStatus || !allowedStatuses.includes(normalizedStatus)) {
            return res.status(400).json({ message: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`, success: false });
        }
        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({ message: "Order not found", success: false });
        }
        order.status = normalizedStatus;
        await order.save();
        res.status(200).json({ message: "Order status updated successfully", success: true, order });
    } catch (error) {
        console.error("updateOrderStatus error:", error);
        res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}