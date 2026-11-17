import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

const Checkout = () => {
  const {totalPrice, axios, navigate, fetchOrders, clearCart} = useContext(AppContext);
  const [ address, setAddress] = useState('');
  const [ paymentMethod, setPaymentMethod] = useState('cash');

  const handleCheckout = async() => {
   if(!address) {
    toast.error("Please enter your address ");
    return;
   } 
   try{
    const {data} = await axios.post('/api/order/place', {
      address,
      paymentMethod
    });
    if(data.success){
      toast.success(data.message);
      console.log("Order placed successfully, clearing cart...");
      await clearCart();
      console.log("Cart cleared, fetching orders...");
      await fetchOrders();
      navigate("/my-orders");
    } else {
      toast.error(data.message);
    }
   }catch(error){
    console.error(error);
    toast.error("Failed to place order");
   }
  }

  return (
    <div className='max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white shadow-lg rounded-2xl'>
      {/* LEFT SIDE - Address */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Delivery Address</h2>
        <label htmlFor="address" className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
        <textarea
          id="address"
          name="address"
          rows={5}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address"
          autoComplete="street-address"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
        />
      </div>


      {/* RIGHT SIDE - Order Summary */}
      <div>
        <h2 className='text-2xl font-bold mb-4 text-gary-800'>Order Summary</h2>
        <div className='bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4'>
          <p className='flex justify-between text-lg font-medium text-gray-700'>
            <span>Total Amount</span>
            <span className='text-green-600 font-semibold'>${totalPrice}</span>
          </p>
        </div>

        <h3 className='text-lg font-medium mb-2 text-gray-800'>
          Payment Method
        </h3>

        <div className='space-y-3'>
          <label htmlFor="payment-cash" className='flex items-center space-x-3'>
            <input type="radio" id="payment-cash" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={(e) => setPaymentMethod(e.target.value)} className='text-green-600 focus:ring-green-500'/>
            <span>Pay at Hotel (Cash)</span>
          </label>
          <label htmlFor="payment-online" className='flex items-center space-x-3'>
            <input type="radio" id="payment-online" name="payment" value="online" checked={paymentMethod === 'online'} onChange={(e) => setPaymentMethod(e.target.value)} className='text-green-600 focus:ring-green-500'/>
            <span>Online Payment</span>
          </label>
        </div>
      </div>
      <button onClick={handleCheckout} className='mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer'>Confirm Order</button>
    </div>
  )
}

export default Checkout