import React,{useContext} from 'react'
import home from './home.png';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Confirmtion from '../Modals/Confirmtion';
import { PublicationContext } from '../../Context/PublicationState';

const Header = () => {
  console.log("I am in header component.")
  const context=useContext(PublicationContext)
  return (
    <div className='flex flex-wrap  p-5 sticky z-10 top-0    bg-gradient-to-r from-[#e9f1fc] to -[#f4f5fc]'>
      <Confirmtion message='logOut' url='/'/>
      <div className='flex justify-start space-x-7 '>
        <img alt="Home" className='' src={home} />
        <h1 className='text-[#7e22ce] text-2xl font-bold'>Shahnwaz Khan</h1>
      </div>
      <div className='flex sm:justify-end justify-center flex-grow '>
        <ul className='font-xl flex  sm:space-x-5 space-x-3 pr-4 sm:pr-0'>
        <Link to='/'><li className='hover:bg-[#7e22ce] hover:text-white hover:rounded-2xl hover:py-1 hover:px-3 transition ease-in duration-700'>Home</li></Link>
        <Link to='/contactUs'><li className='hover:bg-[#7e22ce] hover:text-white hover:rounded-2xl hover:py-1 hover:px-3 transition ease-in duration-700'>ContactUs</li></Link>
          
        {localStorage.getItem('token')?<><Link to='/profile'><li className='hover:bg-[#7e22ce] hover:text-white hover:rounded-2xl hover:py-1 hover:px-3 transition ease-in duration-700'>Profile</li></Link>
        
        <li><button className='bg-[#7e22ce] text-white rounded-2xl py-1 px-3  hover:opacity-50' onClick={()=>{context.setWarningMessage('logOut')}}>LogOut</button></li></>: 
        
        <><Link to='/login'><li><button className='bg-[#7e22ce] text-white text-sm sm:text-base rounded-2xl py-1 sm:px-3 px-2  hover:opacity-50'>Login</button></li></Link>
          <Link to='/signUp'><li><button className='bg-[#7e22ce] text-white text-sm sm:text-base  rounded-2xl  py-1 sm:px-3 px-2 hover:opacity-50'>SignUp</button></li></Link></>}
         

        </ul>
      </div>
    </div>
  )
}

export default Header