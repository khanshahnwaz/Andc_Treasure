import React from 'react'
import {FiCheckCircle} from "react-icons/fi";
const BookCard = (props) => {
  console.log("this is me.")
  console.log("Book card recieved ",props.data)
  return (
    <div key={props.i} className='px-5 py-10 m-2 rounded-lg border-2 broder-gray-400  hover:shadow-xl w-[25vw] h-max text-left min-w-[300px]'>
        <div className='text-2xl font-bold tracking-wide my-2'>
        <h1 className=''>{props.data.BookName}</h1>
        <h2>Title is {props.data.Title}</h2>
        </div>
        <div>
        <div className='flex gap-2 text-black text-lg'>
         <FiCheckCircle className='text-[#7e22ce]'/>
          <h3>ISBN is {props.data.ISBN}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>Publisher is {props.data.Publisher}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>Published in year {props.data.Year}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>Editor is {props.data.Editor}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>Edition is {props.data.Edition}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>Area is {props.data.Area}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>CoAuthors are : {props.data.CoAuthors} </h3></div>
        </div>
        <div className='flex justify-around w-full gap-2 my-2' targetisbn={props.data.ISBN} targettitle={props.data.Title}>
            <button name='edit' className='px-6 rounded-md py-2 bg-[#7e22c3] hover:opacity-50 font-semibold tracking-wide cursor-pointer w-full' >Edit</button>
            <button name='delete' className='px-6 rounded-md py-2 bg-red-500 hover:opacity-50 font-semibold tracking-wide cursor-pointer w-full'>Delete</button>
        </div>
    </div>
  )

}

export default BookCard;