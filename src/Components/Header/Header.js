import React from 'react'
import home from './home.png';
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className='flex flex-wrap  p-5 sticky z-10 top-0  bg-opacity-100  bg-gradient-to-r from-[#e9f1fc] to -[#f4f5fc]'>
      <div className='flex justify-start space-x-7 '>
        <img alt="Home" className='' src={home} />
        <h1 className='text-[#7e22ce] text-2xl font-bold'>Shahnwaz Khan</h1>
      </div>
      <div className='flex justify-end flex-grow '>
        <ul className='font-xl flex  space-x-5'>
        <Link to='/'><li className='hover:bg-[#7e22ce] hover:text-white hover:rounded-2xl hover:py-1 hover:px-3 transition ease-in duration-700'>Home</li></Link>
          <li>Contact</li>
          <Link to='/about'><li className='hover:bg-[#7e22ce] hover:text-white hover:rounded-2xl hover:py-1 hover:px-3 transition ease-in duration-700'>About</li></Link>

          <Link to='/login'><li><button className='bg-[#7e22ce] text-white rounded-2xl py-1 px-3  hover:opacity-50'>Login</button></li></Link>
          <Link to='/signUp'><li><button className='bg-[#7e22ce] text-white  rounded-2xl  py-1 px-3 hover:opacity-50'>SignUp</button></li></Link>

        </ul>
      </div>
    </div>
  )
}

export default Header