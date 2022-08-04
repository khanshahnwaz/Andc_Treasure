import React from 'react'
import user from './user.png'
const UserProfile = () => {
  return (
    <div className='flex bg-[#7e22ce] w-full h-screen relative justify-around'>
        {/* Left container  */}
        <div className='bg-white absolute w-2/4 top-[20%] left-20 z-10  shadow-md rounded-3xl h-[60%]'>
            {/* Profile  Photo and designaion  */}
           <div className=' flex justify-center'>
            <img alt='user' src={user} className='h-40'/>
           
           </div>
           <div className='m-auto'>
           <h1 className='text-2xl tracking-tighter font-bold '>Department of Computer Science</h1>
            <h3 className='text-xl font-semibold tracking-tight'>Assistant professor</h3></div>
           <div className='bg-red-700 absolute top-[65%] left-[4%] w-[30%] h-[30%] items-center text-center font-semibold tracking-tighter rounded z-10 shadow-md '><h2 className='text-2xl font-bold tracking-tighter text-white'>Books</h2></div>
           <div className='bg-blue-700 absolute top-[65%] left-[35%] w-[30%] h-[30%] items-center text-center font-semibold tracking-tighter rounded z-10 shadow-md '><h2 className='text-2xl font-bold tracking-tighter text-white'>Journals</h2></div>
           <div className='bg-green-700 absolute top-[65%] left-[66%] w-[30%] h-[30%] items-center text-center font-semibold tracking-tighter rounded z-10 shadow-md '><h2 className='text-2xl font-bold tracking-tighter text-white'>Conference</h2></div>

        </div>
        {/* Right container  */}
        <div className='bg-white w-1/4 absolute left-[58%] top-[20%] h-2/4 space-x-10 rounded-3xl shadow-2xl'>
            <div><h1 className=' font-bold tracking-tighter text-2xl text-center'>Shahnwaz Khan</h1></div>
            {/* <div className='text-center text-white text-lg tracking-tighter font-bold border-white border-1 shadow-xl p-2'><h1>Edit Profle</h1></div>
            <div className='text-center text-white text-lg tracking-tighter font-bold border-white border-1 shadow-xl p-2'><h1>Change Password</h1></div>
            <div className='text-center text-white text-lg tracking-tighter font-bold border-white border-1 shadow-xl p-2'><h1>Change Email</h1></div> */}

        </div>
    </div>
  )
}

export default UserProfile