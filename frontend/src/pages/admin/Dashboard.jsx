import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { ShoppingCart, Calendar, DollarSign, TrendingUp, Clock, CheckCircle, XCircle, ChefHat, Truck } from "lucide-react";

const Dashboard = () => {
  const { axios } = useContext(AppContext);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/stats");
      if (data.success) {
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
        setRecentBookings(data.recentBookings);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    // Refresh stats every 30 seconds for real-time updates
    const interval = setInterval(fetchDashboardStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Failed to load dashboard data</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-gray-800">{stats.orders.total}</p>
            </div>
            <ShoppingCart className="text-blue-500" size={32} />
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-800">{stats.bookings.total}</p>
            </div>
            <Calendar className="text-green-500" size={32} />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-800">${stats.revenue}</p>
            </div>
            <DollarSign className="text-yellow-500" size={32} />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Orders</p>
              <p className="text-3xl font-bold text-gray-800">{stats.orders.pending}</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Order Status Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <Clock className="text-yellow-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-yellow-700">{stats.orders.pending}</p>
            <p className="text-sm text-yellow-600">Pending</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <CheckCircle className="text-blue-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-blue-700">{stats.orders.confirmed}</p>
            <p className="text-sm text-blue-600">Confirmed</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <ChefHat className="text-purple-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-purple-700">{stats.orders.preparing}</p>
            <p className="text-sm text-purple-600">Preparing</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <Truck className="text-green-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-green-700">{stats.orders.delivered}</p>
            <p className="text-sm text-green-600">Delivered</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <XCircle className="text-red-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-red-700">{stats.orders.cancelled}</p>
            <p className="text-sm text-red-600">Cancelled</p>
          </div>
        </div>
      </div>

      {/* Booking Status Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Status</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <Clock className="text-yellow-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-yellow-700">{stats.bookings.pending}</p>
            <p className="text-sm text-yellow-600">Pending</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-green-700">{stats.bookings.confirmed}</p>
            <p className="text-sm text-green-600">Confirmed</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <XCircle className="text-red-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-red-700">{stats.bookings.cancelled}</p>
            <p className="text-sm text-red-600">Cancelled</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent orders</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">Order #{order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-600">
                      {order.user?.name || "Unknown"} - {order.items.length} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">${order.totalAmount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      order.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                      order.status === "preparing" ? "bg-purple-100 text-purple-700" :
                      order.status === "delivered" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Bookings</h2>
        {recentBookings.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent bookings</p>
        ) : (
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{booking.name}</p>
                    <p className="text-sm text-gray-600">
                      {booking.date} at {booking.time} - {booking.numberOfPeople} guests
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                    booking.status === "Confirmed" ? "bg-green-100 text-green-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;