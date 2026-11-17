import Order from "../models/orderModel.js";
import Booking from "../models/bookingModel.js";

// Get Dashboard Stats
export const getDashboardStats = async (req, res) => {
    try {
        // Get total orders count
        const totalOrders = await Order.countDocuments();
        
        // Get orders by status
        const pendingOrders = await Order.countDocuments({ status: "pending" });
        const confirmedOrders = await Order.countDocuments({ status: "confirmed" });
        const preparingOrders = await Order.countDocuments({ status: "preparing" });
        const deliveredOrders = await Order.countDocuments({ status: "delivered" });
        const cancelledOrders = await Order.countDocuments({ status: "cancelled" });

        // Get total bookings count
        const totalBookings = await Booking.countDocuments();
        
        // Get bookings by status
        const pendingBookings = await Booking.countDocuments({ status: "Pending" });
        const confirmedBookings = await Booking.countDocuments({ status: "Confirmed" });
        const cancelledBookings = await Booking.countDocuments({ status: "Cancelled" });

        // Calculate total revenue from delivered orders
        const deliveredOrdersData = await Order.find({ status: "delivered" });
        const totalRevenue = deliveredOrdersData.reduce((sum, order) => sum + order.totalAmount, 0);

        // Get recent orders (last 5)
        const recentOrders = await Order.find()
            .populate("user", "name email")
            .populate("items.menuItem", "name price")
            .sort({ createdAt: -1 })
            .limit(5);

        // Get recent bookings (last 5)
        const recentBookings = await Booking.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            stats: {
                orders: {
                    total: totalOrders,
                    pending: pendingOrders,
                    confirmed: confirmedOrders,
                    preparing: preparingOrders,
                    delivered: deliveredOrders,
                    cancelled: cancelledOrders,
                },
                bookings: {
                    total: totalBookings,
                    pending: pendingBookings,
                    confirmed: confirmedBookings,
                    cancelled: cancelledBookings,
                },
                revenue: totalRevenue,
            },
            recentOrders,
            recentBookings,
        });
    } catch (error) {
        console.error("getDashboardStats error:", error);
        res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
};
