import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between'>
        <div className='font-bold text-xl'>Orders</div>
        <div className='flex justify-around  space-x-5 font-bold text-xl'>
            <div>Print</div>
            <div>Export</div>
            <div className='bg-[#7e22ce] text-white px-2 rounded py-1 cursor-pointer hover:opacity-50'>Create Order +</div>
        </div>
    </div>
  )
}

export default Header