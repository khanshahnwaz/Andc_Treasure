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
      <div className=''><p className='text-6xl font-bold tracking-widest text-left'>Making <img src={line} alt='line' className='inline-block h-8 bg-'></img><br/> Everybody Feel <br/> Valued At Work.</p>
      <p className='text-base tracking-tight text-gray-500 pt-10 text-left'>With our publication management application,you can save your publications and be<br/> awarded in future.</p>
      <button className='bg-[#9d4be5] text-white rounded-2xl p-3 px-5 mt-5 float-left text-lg text-center'>Get Started</button></div>
      
    <div className=''><img src={user} alt='user' className=' '></img></div>
    </div>

    <div className='flex justify-evenly mt-10 px-44'>
      <div className='text-left'>
         <img src={faculty} alt='faculty'/>
         <h1 className='my-2 text-2xl tracking-tighter font-bold'>Team Accounts</h1>
         <p className='tracking-tight text-sm'>Work as a team and connect with clients.You will get all the team facilities in team management app.</p>
      </div>

      <div className='text-left'>
         <img src={secured} alt='secured'/>
         <h1 className='my-2 text-2xl tracking-tighter font-bold'>Top Notch Secured</h1>
         <p className='tracking-tight text-sm'>We are certified globally and we always guarantee your security.We'll alert you if anything happen.</p>
      </div>

      <div className='text-left '>
         <img src={faculties} alt='faculties'/>
         <h1 className='my-2 text-2xl tracking-tighter font-bold'>Engage Customers</h1>
         <p className='tracking-tight text-sm'>To have more smooth communication, you can collaborate here.So that you don't have to browse others.</p>
      </div>
    </div>
    </div>
  )
}

export default Home