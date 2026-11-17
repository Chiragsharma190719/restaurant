import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Menus from '../components/Menus'
import NewsLetter from '../components/NewsLetter'
import Testimonial from '../components/Testimonial'

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <Categories/>
      <Menus/>
      <NewsLetter/>
      <Testimonial/>
    </div>
  )
}

export default HomePage