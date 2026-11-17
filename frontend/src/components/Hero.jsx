import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import HeroImage from '../assets/Hero1.png'

const Hero = () => {
  const { navigate } = useContext(AppContext)

  return (
    <section
      className="relative h-[90vh] flex items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
    
    {/* Background overlay */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* Content */}
    <div className="relative z-10 text-center text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Restaurant</h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Experience the taste of perfection - where every dish tells a story of passion, tradition, and culinary artistry.</p>
      <div className="flex gap-4 justify-center flex-col sm:flex-row">
        <button onClick={() => navigate('/menu')} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 px-6 rounded-full transition-all duration-300 transform duration-300 hover:scale-105">
          All Menus
        </button>
        <button onClick={() => navigate('/book-table')} className="cursor-pointer bg-transparent border-white hover:bg-white hover:text-black font-semibold py-3 px-6 rounded-full transition-all duration-300 transform duration-300 hover:scale-105">
          Book a Table
        </button>
      </div>
    </div>
    

    </section>
  )
}

export default Hero