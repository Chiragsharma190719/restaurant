import React, { useContext, useEffect } from 'react';
import { CircleX } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';


const Menus = () => {
  const { menus, fetchMenus, axios} = useContext(AppContext);

  const deleteMenu = async (id) => {
    console.log("Deleting menu with ID:", id);
    try{
      const {data} = await axios.delete(`/api/menu/delete/${id}`);
      console.log("Delete response:", data);
      if(data.success){
        toast.success(data.message);
        await fetchMenus(); // Refresh the menu list after successful delete
      } else {
        toast.error(data.message);
      }
    } catch(error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || 'Failed to delete menu')
    }
  }
  return (
    <div className = "py-4">
      <h1 className = "text-3xl font-bold mb-3">All Menus</h1>
      <div className = "border border-gray-400 max-w-5xl mx-auto p-3">
        <div className = "grid grid-cols-5 font-semibold text-gray-700">
          <div>
            Image
          </div>
          <div>
            Name
          </div>
          <div>
            Category
          </div>
          <div>
            Price
          </div>
          <div>
            Action
          </div>
        </div>
        <hr className = "w-full my-4 text-gray-200" />
        <ul>
          {
            menus && menus.length > 0 ? menus.map((item)=>(
            <div key = {item._id}>
            <div className = "grid grid-cols-5 items-center mb-4">
            <div className = "flex items-center gap-2 max-w-md">
            <img src = {item.image} alt = "" className = "w-20 h-20"/>
            </div>
                  <p>{item.name}</p>
                  <p>{item.category?.name || 'N/A'}</p>
                  <p>${item.price}</p>
                  <p className = "text-red-600 cursor-pointer hover:underline" onClick = {() => deleteMenu(item._id)}>
                    <CircleX />
                  </p>
                </div>
                <hr className = "w-full my-4 text-gray-300" />
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No menus available</p>
            )
          }
        </ul>

      </div>
    </div>
  )
}

export default Menus