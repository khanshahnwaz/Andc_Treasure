import React from 'react'
import you from './you.png'
import fb from './fb.png'
import twit from './twit.png'
const Footer = () => {
  return (
    <div className='flex absolute -bottom-64 inset-x-0'>
    <div className='flex justify-start space-x-3 p-4 text-center items-center '>
        <h2 className='text-[#7e22c3] text-2xl tracking-wide font-bold '>Shahnwaz Khan</h2>
        <p className='text-center -tracking-tighter'>Copyright &#169; ShahnwazKhanProjects
        </p>
    </div>
    <div className='flex justify-end  p-5 flex-grow'>
        <ul className='flex space-x-5'>
            <li><a><img alt='YouTube' src={you}/></a></li>
            <li><a><img alt='Twiiter' src={twit}/></a></li>
            <li><a><img alt='Facebook' src={fb}/></a></li>

        </ul>
    </div>
    </div>
  )
}

export default Footer