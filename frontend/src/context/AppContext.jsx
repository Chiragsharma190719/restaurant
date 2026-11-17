import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export const AppContext = createContext();

import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:7000";
axios.defaults.withCredentials = true;

const AppContextProvider = ({children})=>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [categories, setCategories] = useState([]);
    const [menus, setMenus] = useState([]);
    const [cart, setCart] = useState({ items: [] });
    const [totalPrice, setTotalPrice] = useState(0);
    const [orders, setOrders] = useState([]);
    const [adminOrders, setAdminOrders] = useState([]);

    const fetchCartData = async() => {
        try{
            const {data} = await axios.get("/api/cart/get");
            console.log("cart data", data);
            if(data.success) {
                setCart(data.cart);
            } else{
                console.log("Failed to fetch cart data");
            }
        } catch (error) {
            console.log("Error fetching cart data:" , error);
        }
    };

    useEffect(() => {
        if(cart?.items){
            const total = cart.items.reduce((sum, item) => sum + (item.menuItem?.price || 0) * item.quantity, 0);
            setTotalPrice(total);
        }
    }, [cart]);
    const cartCount = cart?.items?.reduce((acc, item)=>acc+item.quantity, 0) || 0;

    // Add to cart function

    const addToCart = async(menuId) => {
        if(!user) {
            toast.error("Please login to add items to cart");
            navigate("/login");
            return;
        }
        try{
            const {data} = await axios.post("/api/cart/add", {menuId, quantity:1});
            console.log("add to cart data", data);
            if(data.success) {
                toast.success(data.message);
                fetchCartData();
            } else{
                console.log("Failed to add to cart");
            }
        } catch (error) {
            console.log("Error adding to cart:" , error);
            if(error.response?.status === 401) {
                toast.error("Please login to add items to cart");
                navigate("/login");
            } else {
                toast.error("Failed to add to cart");
            }
        }
    };

    const removeFromCart = async(menuId) => {
        try{
            const {data} = await axios.delete(`/api/cart/remove`, { data: { menuId } });
            if(data.success){
                toast.success(data.message);
                fetchCartData();
            } else {
                toast.error(data.message);
            }
        } catch(error) {
            console.error("Remove from cart error: ", error);
            toast.error("Something went wrong");
        }
    };

    const clearCart = async() => {
        try{
            console.log("Clearing cart...");
            const {data} = await axios.delete("/api/cart/clear");
            console.log("Clear cart response:", data);
            if(data.success){
                setCart({ items: [] });
            }
        } catch(error) {
            console.error("Clear cart error: ", error);
        }
    };

    const fetchCategories = async() => {
        try{
            const {data} = await axios.get("/api/category/get");
            console.log("data", data);
            if(data.success) {
                setCategories(data.categories);
            } else{
                console.log("Failed to fetch categories");
            }
        } catch (error) {
             console.log("Error fetching categories:" , error);
        }
    }

    const fetchMenus = async() => {
        try{
            const {data} = await axios.get("/api/menu/get");
            console.log("menu data", data);
            if(data.success) {
                setMenus(data.data);
            } else{
                console.log("Failed to fetch menus");
            }
        } catch (error) {
             console.log("Error fetching menus:" , error);
        }
    }

    const isAuth = async() => {
        // Don't check auth if admin is logged in (admin uses different token)
        if(admin) return;

        try{
            const {data} = await axios.get("/api/auth/is-auth");
            if(data.success){
                setUser(data.user);
                // Only fetch protected data if user is authenticated
                fetchCartData();
                fetchOrders();
            } else {
                // Clear cart if user is not authenticated
                setCart({ items: [] });
            }
            // Don't clear user on failure - let them stay logged in
        } catch(error) {
            // Silently handle auth errors - user stays logged in
            // Only log if it's not a 401 (which is expected when not logged in)
            if(error.response?.status === 401) {
                setCart({ items: [] });
            } else {
                console.log("isAuth error:", error);
            }
        }
    }

    const fetchOrders = async() => {
        try{
            const {data} = await axios.get("/api/order/my-orders");
            if(data.success){
                setOrders(data.orders);
            }
        } catch(error) {
            // Silently handle errors
        }
    }

    const fetchAdminOrders = async() => {
        try{
            const {data} = await axios.get("/api/order/orders");
            if(data.success){
                setAdminOrders(data.orders);
            }
        } catch(error) {
            // Silently handle 403 errors - user is not admin
            if(error.response?.status !== 403) {
                console.log("Error fetching admin orders:", error);
            }
        }
    }

    useEffect(() => {
        isAuth();
        fetchCategories();
        fetchMenus();
    }, []);
    const value = {
        loading,
        setLoading,
        navigate,
        user,
        setUser,
        admin,
        setAdmin,
        axios,
        categories,
        setCategories,
        fetchCategories,
        menus,
        setMenus,
        fetchMenus,
        addToCart,
        cartCount,
        cart,
        setCart,
        totalPrice,
        fetchCartData,
        fetchOrders,
        orders,
        setOrders,
        fetchAdminOrders,
        adminOrders,
        setAdminOrders,
        removeFromCart,
        clearCart,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;