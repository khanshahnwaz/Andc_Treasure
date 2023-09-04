import React from 'react'
import tri from './tri.png'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
const Left = () => {
  return (
    <>
    
    <div  className={` w-[20%]  md:block hidden h-screen bg-black`}>
            <img src={tri} alt='triangle' className='inline float-left'/><h1 className="text-gray-200 text-left px-10">andc<span className="text-white font-bold text-xl">TREASURE</span></h1>
            <ul className="mt-20  text-gray-400 text-lg text-left items-center">
                <Link to='/'><li className="py-2 hover:border-gray-400 hover:border-2 hover:text-white w-32 mt-2 rounded-lg px-2">Home</li></Link>
                <li className="py-2 hover:border-gray-400 hover:border-2 hover:text-white w-32 mt-2 rounded-lg px-2">Recents</li>
                <li className="py-2 hover:border-gray-400 hover:border-2 hover:text-white w-32 mt-2 rounded-lg px-2">Recycle bin</li>
                <li className="py-2 hover:border-gray-400 hover:border-2 hover:text-white w-32 mt-2 rounded-lg px-2">Contacts</li>
                <li className="py-2 hover:border-gray-400 hover:border-2 hover:text-white w-32 mt-2 rounded-lg px-2">Setting</li>
                <Link to='/contactUs'><li className="py-2 hover:border-gray-400 hover:border-2 hover:text-white w-32 mt-2 rounded-lg px-2">Contact Us</li></Link>

            </ul>
            <div className="mt-32 bg-gray-600 shadow-md rounded h-[15%] mx-2 ">
                <p className='text-gray-300 text-center tracking-normal align-center'>Talk to us for any issue.</p>
                <Link to='/contactUs'><div className="bg-black w-[45%] text-white align-center relative top-[30%] left-[30%] hover:border-white">Contact us  &#x2192;</div></Link>
            </div>
        </div>






       
        </>
  )
}

export default Left