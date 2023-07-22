import React,{useState} from 'react'
import book from './book.png'
import { useContext } from 'react'
import { PublicationContext } from '../../Context/PublicationState'
import { Link } from 'react-router-dom'

const Right = (props) => {
    const context=useContext(PublicationContext)
  return (
    <>
   
    <div className={`bg-white lg:block ${props.style} md:w-[20%] w-full md:m-2 p-3 absolute md:static top-0   transition-all duration-1000 ease-in-out delay-75`}>
    <div>
    <h1 className='text-3xl text-left tracking-wide font-bold '>{context.loggedInName}</h1>
    <p className='text-left mt-2'>Professor</p>
    </div>

    <div className='text-center i  bg-blue rounded-t-full  border-b-0 border-[40px] border-black border-r-indigo-300 h-36 w-64 m-auto md:mt-10'>
        <div className='mt-10'>
        <p className='text-4xl text-center font-bold'>75%</p>
        <p className='text-center text-xl '>Profile</p>
        
        </div>
    </div>

    <div className='mt-24'>
        <Link to='/bookDetails'><div className='flex justify-between'>
            <div className='flex justify-start'>
            <img src={book} alt='book' className='bg-yellow-300'/>
            <div >
                <h3 className='text-xl font-semibold mx-1 align-center'>Books</h3>
                <p className='text-sm mx-1 text-left'>13 files</p>
            </div>
            </div>
            <p className='text-sm px-2 cursor-pointer hover:text-base'>View &rarr;</p>
        </div>
        </Link>

        <Link to='/journalDetails'>
        <div className='flex justify-between my-5'>
            <div className='flex justify-start'>
            <img src={book} alt='book' className='bg-green-300'/>
            <div >
                <h3 className='text-xl font-semibold mx-1 align-center'>Journals</h3>
                <p className='text-sm mx-1 text-left'>0 files</p>
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
                <p className='text-sm mx-1 text-left'>10 files</p>
            </div>
            </div>
            <p className='text-sm px-2 cursor-pointer hover:text-base'>View &rarr;</p>
        </div>
        </Link>
    </div>

    <div className='mt-10 border-dashed border-gray-500 border-4 rounded-xl'>
          <div className='flex justify-between hover:border-2 border-gray-300'>
            <p className='text-xl '>
                shahnwaz@andc.du.ac.in
            </p>
            <p className='text-sm hover:text-gray-400 cursor-pointer'>Edit &rarr;</p>
          </div>
          <div className='flex justify-between hover:border-2 border-gray-300'>
            <p className='text-xl '>
                Professor
            </p>
            <p className='text-sm hover:text-gray-400 cursor-pointer'>Edit &rarr;</p>
          </div>
          <div className='flex justify-between hover:border-2 border-gray-300'>
            <p className='text-xl '>
                Computer Science
            </p>
            <p className='text-sm hover:text-gray-400 cursor-pointer'>Edit &rarr;</p>
          </div>
          <div className='flex justify-between hover:border-2 border-gray-300'>
            <p className='text-xl  '>
                Password
            </p>
            <p className='text-sm hover:text-gray-400 cursor-pointer'>Edit &rarr;</p>
          </div>
    </div>
</div>
</>
  )
}

export default Right