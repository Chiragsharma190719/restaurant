import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { LayoutDashboard, Plus, Package, Grid3x3, X, Menu, ShoppingCart, BookOpen, LogOut } from 'lucide-react'
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const AdminLayout = () => {

  const {navigate, setAdmin, setUser, axios} = useContext(AppContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      path: "/admin/add-category",
      name: "Add Category",
      icon: Plus,
    },
    {
      path: "/admin/add-menu",
      name: "Add Menu",
      icon: Package,
    },
    {
      path: "/admin/categories",
      name: "Categories",
      icon: Grid3x3,
    },
    {
      path: "/admin/menus",
      name: "All Menus",
      icon: Grid3x3,
    },
    {
      path: "/admin/orders",
      name: "Orders",
      icon: ShoppingCart,
    },
    {
      path: "/admin/bookings",
      name: "Bookings",
      icon: BookOpen,
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname === path;
  }

  const logout = async() => {
    try{
      const {data} = await axios.post("/api/auth/logout")
      if(data.success) {
        toast.success("Logged out successfully");
        setAdmin(null);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.setItem("adminLogout", "true");
        navigate("/admin");
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className = "flex h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <div className = "lg:hidden fixed top-4 left-4 z-50">
        <button onClick = {()=>setSidebarOpen(!sidebarOpen)} className = "bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 text-gray-800 p-2 rounded-md">
          {sidebarOpen ? <X size = {24}/>:<Menu size = {24}/>}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path, item.exact)
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout