import React, { useContext } from 'react'
import { X } from 'lucide-react'
import { AppContext } from '../context/AppContext'

const Cart = () => {
  const { cart, totalPrice, navigate, removeFromCart } = useContext(AppContext);

  if(!cart || !cart.items || cart.items.length === 0){
    return (
      <div className='flex flex-col items-center justify-center h-64'>
        <h2 className='text-2xl font-semibold text-gray-700'>
          Your Cart is Empty
        </h2>
      </div>
    )
  }
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6'>
      <h2 className='text-2xl font-semibold mb-6 text-center'>Your Cart</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-200 rounded-lg'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='py-3 px-4 text-left text-gray-700'>Item</th>
              <th className='py-3 px-4 text-left text-gray-700'>Qty</th>
              <th className='py-3 px-4 text-left text-gray-700'>Price</th>
              <th className='py-3 px-4 text-left text-gray-700'>Total</th>
              <th className='py-3 px-4 text-left text-gray-700'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              cart?.items?.map((item)=>(
                <tr key={item.menuItem._id} className='border-t hover:bg-gray-50'>
                  <td className='py-3 px-4 flex items-center space-x-3'>
                    <img src={item.menuItem.image} alt={item.menuItem.name} className='w-12 h-12 rounded object-cover' />
                    <span className='font-medium text-gray-800'>
                      {item.menuItem.name}
                    </span>
                  </td>
                  <td className='py-3 px-4'>
                    {item.quantity}
                  </td>
                  <td className='py-3 px-4'>
                    ${item.menuItem.price}
                  </td>
                  <td className='py-3 px-4'>
                    ${item.menuItem.price * item.quantity}
                  </td>
                  <td className='py-3 px-4'>
                    <X onClick={() => removeFromCart(item.menuItem._id)} className='w-6 h-6 cursor-pointer hover:text-red-600' />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className='flex justify-between items-center mt-6'>
            <h3 className='text-xl font-semibold'>Total: <span className='text-green-600'>${totalPrice}</span></h3>
            <button onClick={() => navigate('/checkout')} className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-600 transitiion'>Checkout</button>
      </div>
    </div>
  )
}

export default Cart