import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Categories = () => {
    const {navigate, categories} = useContext(AppContext);
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Explore our <span className="text-yellow-500 ">Categories</span></h2>
            <p className="text-gray-600">Discover delicious dishes from our carefully curated categories</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {
                    categories.map((cat) => (
                        <div key={cat._id} className="cursor-pointer group">
                            <div className="relative overflow-hidden rounded-lg">
                                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition-colors">
                                        View Menu
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-yellow transition-colors duration-300 mt-4">{cat.name}</h3>
                            <p className="text-gray-600">{cat.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>


    </section>
  )
}

export default Categories