import React,{useState} from 'react'
import book from './book.png'
import { useContext } from 'react'
import { PublicationContext } from '../../Context/PublicationState'
import { Link } from 'react-router-dom'

const Right = (props) => {
    const context=useContext(PublicationContext)
  return (
    <>
   
    <div className={`bg-white  ${props.style} md:opacity-100 md:w-[20%] w-full md:m-2 p-3  md:static top-0   transition-all duration-1000 ease-in-out delay-75 grid gap-y-5`}>
    <div>
    <h1 className='text-3xl text-left tracking-wide font-bold '>{JSON.parse(localStorage.getItem('data')).name}</h1>
    <p className='text-left '>{context.currentUser.designation}</p>
    </div>

    <div className='text-center i  bg-blue rounded-t-full  border-b-0 border-[40px] border-black border-r-indigo-300 h-36 w-64 m-auto '>
        <div className='mt-10'>
        <p className='text-4xl text-center font-bold'>75%</p>
        <p className='text-center text-xl '>Profile</p>
        
        </div>
    </div>

    <div className=' grid gap-y-5'>
        <Link to='/bookDetails'><div className='flex justify-between'>
            <div className='flex justify-start'>
            <img src={book} alt='book' className='bg-yellow-300'/>
            <div >
                <h3 className='text-xl font-semibold mx-1 align-center'>Books</h3>
                <p className='text-sm mx-1 text-left'>{context.currentUser.bookLen} files</p>
            </div>
            </div>
            <p className='text-sm px-2 cursor-pointer hover:text-base'>View &rarr;</p>
        </div>
        </Link>
        <Link to='/chapterDetails'>
        <div className='flex justify-between '>
            <div className='flex justify-start'>
            <img src={book} alt='book' className='bg-indigo-300'/>
            <div >
                <h3 className='text-xl font-semibold mx-1 align-center'>Chapters</h3>
                <p className='text-sm mx-1 text-left'>{context.currentUser.chapterLen} files</p>
            </div>
            </div>
            <p className='text-sm px-2 cursor-pointer hover:text-base'>View &rarr;</p>
        </div>
        </Link>
        <Link to='/journalDetails'>
        <div className='flex justify-between '>
            <div className='flex justify-start'>
            <img src={book} alt='book' className='bg-green-300'/>
            <div >
                <h3 className='text-xl font-semibold mx-1 align-center'>Journals</h3>
                <p className='text-sm mx-1 text-left'>{context.currentUser.journalLen} files</p>
            </div>
            </div>
            <p className='text-sm px-2 cursor-pointer hover:text-base'>View &rarr;</p>
        </div>
        </Link>

        <Link to='/conferenceDetails'>
        <div className='flex justify-between '>
            <div className='flex justify-start'>
            <img src={book} alt='book' className='bg-indigo-300'/>
            <div >
                <h3 className='text-xl font-semibold mx-1 align-center'>Conferences</h3>
                <p className='text-sm mx-1 text-left'>{context.currentUser.conferenceLen} files</p>
            </div>
            </div>
            <p className='text-sm px-2 cursor-pointer hover:text-base'>View &rarr;</p>
        </div>
        </Link>
    </div>

    <div className=' border-dashed border-gray-500 border-4 rounded-xl h-full flex flex-col justify-around'>
          <div className='flex justify-between hover:border-2 border-gray-300'>
            <p className='text-xl '>
            {JSON.parse(localStorage.getItem('data')).email}
            </p>
            <p className='text-sm hover:text-gray-400 cursor-pointer'>Edit &rarr;</p>
          </div>
          <div className='flex justify-between hover:border-2 border-gray-300'>
            <p className='text-xl '>
            {JSON.parse(localStorage.getItem('data')).designation}
            </p>
            <p className='text-sm hover:text-gray-400 cursor-pointer'>Edit &rarr;</p>
          </div>
          <div className='flex justify-between hover:border-2 border-gray-300'>
            <p className='text-xl '>
            {JSON.parse(localStorage.getItem('data')).department}
            </p>
            <p className='text-sm hover:text-gray-400 cursor-pointer'>Edit &rarr;</p>
          </div>
          <div className='flex justify-between hover:border-2 border-gray-300'>
            <p className='text-xl  '>
            {JSON.parse(localStorage.getItem('data')).phone}
            </p>
            <p className='text-sm hover:text-gray-400 cursor-pointer'>Edit &rarr;</p>
          </div>
    </div>
</div>
</>
  )
}

export default Right