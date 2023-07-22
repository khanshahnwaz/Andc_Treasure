import React from 'react'
import {FiCheckCircle} from "react-icons/fi";
const JournalCard = (props) => {
  return (
    <div key={props.i} className='px-5 py-10 m-2 rounded-lg border-2 broder-gray-400  hover:shadow-xl w-[25vw] h-max text-left'>
        <div className='text-2xl font-bold tracking-wide my-2'>
        <h1 className=''>{props.data.JournalName}</h1>
        <h2>Title is {props.data.Title}</h2>
       
        </div>
        <div>
        <div className='flex gap-2 text-black text-lg'>
         <FiCheckCircle className='text-[#7e22ce]'/>
          <h3>ISSN is {props.data.ISSN}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>Publisher is {props.data.Publisher}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>Published in year {props.data.Year}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>Volume is  {props.data.Volume}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>{props.data.CorrespondingAuthor=='YES'?'You are corresponding author.':'Not a corresponding author.'}</h3></div>

        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>{props.data.FirstAuthor=='YES'?'You are first author.':'Not a first author.'}</h3></div>
        <div className='flex gap-2'><FiCheckCircle className='text-[#7e22ce]'/><h3>CoAuthors are {props.data.CoAuthors}</h3></div>
       
        </div>
        <div className='flex justify-around w-full gap-2 my-2' targetisbn={props.data.ISSN} targettitle={props.data.Title}>
            <button name='edit' className='px-6 rounded-md py-2 bg-[#7e22c3] hover:opacity-50 font-semibold tracking-wide cursor-pointer w-full' >Edit</button>
            <button name='delete' className='px-6 rounded-md py-2 bg-red-500 hover:opacity-50 font-semibold tracking-wide cursor-pointer w-full'>Delete</button>
        </div>
    </div>
  )

}

export default JournalCard;