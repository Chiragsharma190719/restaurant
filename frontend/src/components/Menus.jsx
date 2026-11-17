import { useContext } from "react";

import { AppContext } from "../context/AppContext";

import MenuCard from "./MenuCard";



const Menus = () => {

  const { menus } = useContext(AppContext);

  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">

      <div className="container mx-auto px-4">

        <div className="text-center mb-12">

          <h1>Our <span className="text-yellow-500">Menu</span></h1>

          <p className="text-gray-600 max-w-2xl mx-auto">{menus.length > 0 ? `Explore our delicious selection of ${menus.length} dishes, crafted with the finest ingredients and served with passion.` : "Loading menu..."}</p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {

            menus.map((menu) => (

              <MenuCard key = {menu._id} menu={menu} />

            ))

          }

        </div>

      </div>

    </div>

  ) 

}

export default Menus