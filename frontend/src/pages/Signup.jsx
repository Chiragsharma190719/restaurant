import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User2Icon, MailIcon, LockIcon } from 'lucide-react';
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Signup = () => {

  const { navigate, axios, loading, setLoading } = useContext(AppContext);
  
    const [state, setState] = useState("login")

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();  
        try {
            setLoading(true);
            const {data} = await axios.post("/api/auth/register", formData);
            if(data.success) {
                toast.success(data.message);
                navigate("/login");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message || "An error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
      <div className='py-12 flex items-center justify-center'>
        <form
            onSubmit={handleSubmit}
            className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8">
            <h1 className="text-white text-3xl mt-10 font-medium">
                Register
            </h1>

            <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

            <div className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <User2Icon className='text-white'/>
                <input type="text" name="name" placeholder="Name" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={formData.name} onChange={handleChange} required />
            </div>
            

            <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <MailIcon className='text-white'/>
                <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={formData.email} onChange={handleChange} required />
            </div>

            <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <LockIcon className='text-white'/>
                <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none" value={formData.password} onChange={handleChange} required />
            </div>

            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-orange-500 hover:bg-orange-400 transition-opacity cursor-pointer " disabled={loading}>
                {loading ? "Loading..." : "Create Account"}
            </button>

            <p onClick={() => setState(prev => prev === "login" ? "register" : "login") } className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer" >
                Already have an account?
                <Link to="/login" className="text-indigo-400 dark:text-indigo-400">
                  Login
                </Link>
            </p>
        </form>
      </div>
  )
}

export default Signup