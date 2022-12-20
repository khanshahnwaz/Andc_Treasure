import React from 'react'
import user from './user1.png'
import line from './line.png'
import faculty from './faculty.png';
import faculties from './faculties.png'
import secured from './secured.png'

const Home = () => {
  return (
    <div className='h-screen px-20 w-screen mt-10 z-0'>
    <div className='flex justify-evenly '>
      <div className=''><p className='lg:text-6xl sm:text-xl text-sm font-bold tracking-widest text-left'>Making <img src={line} alt='line' className='inline-block sm:h-8 h-4 bg-'></img><br/> Everybody Feel <br/> Valued At Work.</p>
      <p className='text-base tracking-tight text-gray-500 sm:pt-10 pt-5 text-left '>With our publication management application,you can save your publications and be<br/> awarded in future.</p>
      <button className='bg-[#9d4be5] text-white rounded-2xl sm:py-3 sm:px-5 px-1 py-1 sm:mt-5 mt-2 float-left sm:text-lg text-sm text-center'>Get Started</button></div>
      
    <div className=''><img src={user} alt='user' className=' '></img></div>
    </div>

    <div className='flex justify-evenly mt-4 px-22 sm:mt-10 sm:px-44'>
      <div className='text-left'>
         <img src={faculty} alt='faculty' className='h-6'/>
         <h1 className='sm:my-2 sm:text-2xl te tracking-tighter font-bold'>Team Accounts</h1>
         <p className='tracking-tight text-sm'>Work as a team and connect with clients.You will get all the team facilities in team management app.</p>
      </div>

      <div className='text-left mx-4'>
         <img src={secured} alt='secured' className='h-6 sm:h-6'/>
         <h1 className='sm:my-2 my-1 sm:text-2xl tracking-tighter font-bold'>Top Notch Secured</h1>
         <p className='tracking-tight text-sm'>We are certified globally and we always guarantee your security.We'll alert you if anything happen.</p>
      </div>

      <div className='text-left '>
         <img src={faculties} alt='faculties' className='h-6'/>
         <h1 className='sm:my-2 my-1 sm:text-2xl tracking-tighter font-bold'>Engage Customers</h1>
         <p className='tracking-tight text-sm'>To have more smooth communication, you can collaborate here.So that you don't have to browse others.</p>
      </div>
    </div>
    </div>
  )
}

export default Home