import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        // Check if user just logged out from admin
        if(localStorage.getItem("adminLogout")) {
            localStorage.removeItem("adminLogout");
            return;
        }
        try{
            const {data} = await axios.get("/api/auth/is-auth");
            if(data.success){
                setUser(data.user);
            }
        } catch(error) {
            console.log(error);
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
        fetchMenus
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;