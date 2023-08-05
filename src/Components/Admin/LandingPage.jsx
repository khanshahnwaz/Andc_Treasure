import React from 'react'
import { Link } from 'react-router-dom'
import Card from './AdminCards/Card'
const LandingPage = () => {
  return (
    <>
    <div className='m-auto text-4xl md:text-9xl tracking-wider md:w-2/3'>
      <div className='rounded-lg bg-white px-3'>
        {/* image herer */}
      </div>
        <h1 className='font-thin '>OUR FACULTIES WRITE THE BEST PUBLICATIONS EVER</h1>
    </div>
    <Link to='/profile'><button className='bg-[#7e22ce] md:w-1/5 md:px-5 px-3 py-2 md:text-lg text-white rounded-xl my-3 hover:opacity-50'>Add your new publication now</button></Link>
  <div className='w-4/5 m-auto md:my-10'>
    <h2 className='text-2xl tracking-wide font-bold text-left mb-2'>Explore the publications </h2>


    <div className='grid md:grid-cols-2  m-auto gap-2 '>
    <Card color='bg-yellow-200  rounded-2xl  px-3 md:h-72 transition-all ease-in duration-300 hover:shadow-2xl' pub='Books' path='/admin/bookDetails'/>
       <Card color='bg-red-200  rounded-2xl  px-3 md:h-72 transition-all ease-in duration-300 hover:shadow-2xl' pub='Chapters' path='/admin/chapterDetails'/>
        <Card color='bg-green-200  rounded-2xl px-3 md:h-72 transition-all ease-in duration-300 hover:shadow-2xl' pub='Journals' path='/admin/journalDetails'/>
        <Card color='bg-indigo-200  rounded-2xl px-3 md:h-72 transition-all ease-in duration-300 hover:shadow-2xl' pub='Conferences' path='/admin/conferenceDetails'/>
    </div>
  </div>
    </>
  )
}

export default LandingPage