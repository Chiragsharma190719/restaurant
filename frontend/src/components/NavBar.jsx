import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle, Calendar, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";

const NavBar = () => {

  const { navigate, user, setUser, axios } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async() => {
        try{
            const {data} = await axios.post("/api/auth/logout");
            if(data.success){
                setUser(null);
                toast.success("Logged out successfully");
                navigate("/");
            }
        } catch(error) {
            console.log(error);
        }
    }
  return (
    <nav className = "bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              <img src="./logo.png" alt="Logo" className="w-20" />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Menu</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button onClick={()=>navigate("/cart")} className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart size={22} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">3</span>
            </button>

            <div className="hidden md:block">
              {
                user?(
                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onMouseEnter={()=>setIsProfileOpen(true)} onMouseLeave={()=>setIsProfileOpen(false)}>
                    <UserCircle size={30} className="text-gray-700" />
                  </button>

                  {
                    isProfileOpen && (
                      <div onMouseEnter={()=> setIsProfileOpen(true)} onMouseLeave={()=> setIsProfileOpen(false)} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100"> 
                        <Link to={"/my-bookings"} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                          <Calendar size={18} className="mr-3" />
                          My Bookings
                        </Link>
                        <Link to={"/my-orders"} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                          <Calendar size={18} className="mr-3" />
                          My Orders
                        </Link>

                        <button onClick={handleLogout} className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut size={18} className="mr-3" />
                          Logout
                        </button>
                      </div>
                    )
                  }

                </div>):(
                  <button onClick={()=>navigate("/login")} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium cursor-pointer">
                    Login
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Menu</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</Link>

            {
                user?(
                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onMouseEnter={()=>setIsProfileOpen(true)} onMouseLeave={()=>setIsProfileOpen(false)}>
                    <UserCircle size={30} className="text-gray-700" />
                  </button>

                  {
                    isProfileOpen && (
                      <div onMouseEnter={()=> setIsProfileOpen(true)} onMouseLeave={()=> setIsProfileOpen(false)} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100"> 
                        <Link to={"/my-bookings"} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                          <Calendar size={18} className="mr-3" />
                          My Bookings
                        </Link>
                        <Link to={"/my-orders"} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                          <Calendar size={18} className="mr-3" />
                          My Orders
                        </Link>

                        <button onClick={handleLogout} className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut size={18} className="mr-3" />
                          Logout
                        </button>
                      </div>
                    )
                  }
                </div>
                ):
                (
                  <button onClick={()=> navigate("/login")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Login
                  </button>
                )
              }
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar