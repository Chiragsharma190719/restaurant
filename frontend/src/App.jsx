import {Routes, Route} from 'react-router-dom'
import Home from './pages/HomePage'
import Menu from './pages/Menu'
import MenuDetails from './pages/MenuDetails'
import BookTable from './pages/BookTable'
import MyOrders from './pages/MyOrders'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MyBookings from './pages/MyBooking'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contact from './pages/Contact'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import AddCategory from './pages/admin/AddCategory'
import Categories from './pages/admin/Categories'
import AddMenu from './pages/admin/AddMenu'
import Menus from './pages/admin/Menus'
import Bookings from './pages/admin/Bookings'
import Orders from './pages/admin/Orders'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'

function App() {

  const adminPath = useLocation().pathname.includes('/admin');
  const {admin} = useContext(AppContext);
  return (
    <div>
      <Toaster />
      {!adminPath && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-details/:id" element={<MenuDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />


      {/* Admin Routes */}
      {adminPath && (
        <>
          <Route path="/admin" element={admin ? <AdminLayout /> : <AdminLogin/> }>
            <Route index element = {admin ? <Dashboard/> : <AdminLogin/>}/>
            <Route path='add-category' element = {admin ? <AddCategory/> : <AdminLogin/>}/>
            <Route path='categories' element = {admin ? <Categories/> : <AdminLogin/>}/>
            <Route path='add-menu' element = {admin ? <AddMenu/> : <AdminLogin/>}/>
            <Route path='menus' element = {admin ? <Menus/> : <AdminLogin/>}/>
            <Route path='bookings' element = {admin ? <Bookings/> : <AdminLogin/>}/>
            <Route path='orders' element = {admin ? <Orders/> : <AdminLogin/>}/>
          </Route>
        </>
      )}


      </Routes>
      {!adminPath && <Footer />}
    </div>
  )
}

export default App