import React,{useContext} from 'react'
import book from './book.png'
import Card from './Card';
import { PublicationContext } from '../../Context/PublicationState';
const Center = () => {
    const context=useContext(PublicationContext);
  return (
    <div className='lg:block hidden mt-10 lg:w-[60%] pr-2 pl-10'>
    <div className='flex justify-between'>
        <div><h1 className='text-3xl font-bold text-left  '>My Treasure</h1></div>
    <div><input type='text' placeholder='Search your file' className='border-2 px-4 py-2 rounded-xl w-96 text-left active:border-black active:shadow-md float-left'></input></div></div>
    <div className='mt-10 flex '>
        <div >
        <h2 className='text-3xl font-semibold text-left tracking-tightest '>Publications</h2></div>
        
    </div>
    <div className='grid md:grid-cols-4   gap-x-3 mt-2'>
       <Card color='bg-yellow-300  rounded-2xl  px-3' pub='Books' path='/bookDetails' len={context.currentUser.bookLen} />
       <Card color='bg-red-300  rounded-2xl  px-3' pub='Chapters' path='/chapterDetails' len={context.currentUser.chapterLen}/>
        <Card color='bg-green-300  rounded-2xl px-3' pub='Journals' path='/journalDetails' len={context.currentUser.journalLen}/>
        <Card color='bg-indigo-300  rounded-2xl px-3' pub='Conferences' path='/conferenceDetails' len={context.currentUser.conferenceLen}/>
    </div>
    <div className='mt-10'>
        <div><h2 className='text-left text-2xl tracking-wide font-bold'>Recently uploaded files</h2></div>
        <div className='rounded shadow-lg px-3 py-3'>
            <div className='flex justify-between'>
                <div>Name &uarr;</div>
                <div>Added at &uarr;</div>
            </div>
            <div className='flex justify-between my-1'>
                <div className='flex justify-start'>
                <div className=' bg-yellow-300 pb-0'><img src={book} alt='Book' className='my-auto '/></div>
                <div className='space-x-5'>
                    <h4 className='font-bold'>Core Java</h4>
                    <p className='text-left'>Why not java?</p>
                </div>
                </div>
                <div>{new Date().toUTCString()}</div>
            </div>

            <div className='flex justify-between my-1'>
                <div className='flex justify-start'>
                <div className='inline-block bg-green-300'><img src={book} alt='Book' className='my-auto '/></div>
                <div className='space-x-5'>
                    <h4 className='font-bold'>Harry Potter</h4>
                    <p className='text-left'>Jadu ki kahani</p>
                </div>
                </div>
                <div>{new Date().toUTCString()}</div>
            </div>

            <div className='flex justify-between my-1'>
                <div className='flex justify-start'>
                <div className='inline-block bg-indigo-300'><img src={book} alt='Book' className='my-auto'/></div>
                <div className='space-x-5'>
                    <h4 className='font-bold'>Netwon's Law</h4>
                    <p className='text-left'>Hell for students</p>
                </div>
                </div>
                <div>{new Date().toUTCString()}</div>
            </div>

            <div className='flex justify-between my-1'>
                <div className='flex justify-start'>
                <div className=' bg-red-300 pb-0'><img src={book} alt='Book' className='my-auto'/></div>
                <div className='space-x-5'>
                    <h4 className='font-bold'>Data Structure</h4>
                    <p className='text-left'>Magic of algorithms</p>
                </div>
                </div>
                <div>{new Date().toUTCString()}</div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Center