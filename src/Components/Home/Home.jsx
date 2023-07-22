import React from 'react'
import user from './user1.png'
import line from './line.png'
import faculty from './faculty.png';
import principal from '../Assets/principal.jpg'
import faculties from './faculties.png'
import secured from './secured.png'

const Home = () => {
  return (
    <div className='min-h-screen h-max md:px-20 px-10 w-[95vw] md:w-[80vw] md:mt-10 z-0 mx-auto'>
    <div className='md:flex justify-between '>
      <div className=''><p className='lg:text-6xl text-xl font-bold -tracking-tighter text-left'>Making <img src={line} alt='line' className='inline-block sm:h-8 h-4 bg-'></img><br/>Everybody Feel <br/> Valued At Work.</p>
      <p className='text-base md:tracking-tight text-gray-500 sm:pt-10 pt-5 md:text-left text-justify'>With our publication management application,you can save your publications and be<br/> awarded in future.</p>
      <button className='bg-[#9d4be5] text-white rounded-2xl sm:py-3 sm:px-5 px-2 py-1 sm:mt-5 my-2 md:mt-2 float-left sm:text-lg text-sm text-center'>Get Started</button></div>
      
    <div className=''><img src={user} alt='user' className=' '></img></div>
    </div>

    <div className='flex justify-between mt-4 sm:mt-10  '>
      
    <img src={principal} alt='principal' className='h-96  hidden md:block '></img>
      <div className='text-justify float-right w-[50%]'>
         <img src={faculty} alt='faculty' className='h-6 md:hidden '/>
         <h1 className='sm:my-2 sm:text-4xl  tracking-tighter font-semibold md:font-bold'>Principal's message</h1>
         <p className='text-base tracking-tight text-gray-500 '>Education is the most powerful weapon which you can use to change the world.” - Nelson Mandela
At the very outset I, on behalf of Acharya Narendra Dev College welcome you all to the world where education makes a difference....</p>
      </div>

      {/* <div className=''>
         <img src={secured} alt='secured' className='h-6 sm:h-6'/>
         <h1 className='sm:my-2 my-1 sm:text-2xl  font-semibold md:font-bold'>Top Notch Secured</h1>
         <p className=' text-base tracking-tight text-gray-500'>We are certified globally and we always guarantee your security.We'll alert you if anything happen.</p>
      </div> */}

      {/* <div className=' '>
         <img src={faculties} alt='faculties' className='h-6'/>
         <h1 className='sm:my-2 my-1 sm:text-2xl tracking-tighter font-semibold md:font-bold'>Engage Customers</h1>
         <p className=' text-base tracking-tight text-gray-500'>To have more smooth communication, you can collaborate here.So that you don't have to browse others.</p>
      </div> */}
    </div>
    </div>
  )
}

export default Home