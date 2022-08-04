import React from 'react'
import college from './college.jpg'
import a1 from './award1.jpg';
import a2 from './award2.jpg'
import a3 from './award3.jpg'
import a4 from './award4.jpg'

const Home = () => {

    // forward and backward buttons functionality '
    let counter=0;
    const moveForward=()=>{
        const slide=document.getElementsByClassName('slides');
        // console.log(slide);
        for(let i=0;i<3;i++){
            slide[i].style.display='none';
        }
        slide[counter].style.display='block';
        if(counter===2){
            counter=-1;
        }
        counter++;

    }
    const moveBackward=()=>{
        const slide=document.getElementsByClassName('slides');
        // console.log(slide);
        for(let i=0;i<3;i++){
            slide[i].style.display='none';
        }
        slide[counter].style.display='block';
        if(counter===-1){
            counter=0;
        }
        if(counter===0){
            counter=2;
        }else if(counter===2){
            counter=1;
        }else counter=0;
    }
  return (
    <div className='h-[1500px]'>
    <div className='flex mt-48 justify-between space-x-28 items-center ml-28'>
        <div className='w-2/4'>
        <div className='tracking-widest font-extrabold text-3xl '>
            <h1 className=' '>Welcome to <span className='text-[#7e22ce] '>ANDC Treasure</span> </h1>
        </div>
        <div className='tracking-wider text-lg font-serif  text-center mt-10'>
            <h3>Don't know what it is? We are storing publication details of our faculties so that it can you can  be recognized and awarded in future. </h3>

        </div>
        </div>

        <div className='w-3/4 '>
            <img alt="ANDC" src={college} className='h-80 float-right' />
        </div>
    </div>
    <div className='text-2xl tracking-wide font-bold m-5 mt-10'>Glimpses of Award Show at <span className='text-[#7e22ce]'>ANDC</span></div>
    <div className='slideShowContainer relative flex  m-auto w-2/4 '>
        {/* First image html */}
        <div className='absolute slides transition-[fade] duration-{1500}'>
            <div className='absolute text-white'>1/3</div>
            <img alt='College Award' className='' src={a1}/>
            <div className='absolute bottom-1 right-96 text-white text-xl'><p className=''>Caption One</p></div>
        </div>

        {/* Second image html */}
        <div className='absolute hidden slides  transition-[fade] duration-{1500}'>
            <div className='absolute text-white'>2/3</div>
            <img alt='College Award' className='' src={a2}/>
            <div className='absolute bottom-1 right-96 text-white text-xl'><p className=''>Caption Two</p></div>
        </div>

        
         

         {/* Third image html */}
         <div className='absolute slides hidden transition-[fade] duration-{1500}'>
            <div className='absolute text-white'>3/3</div>
            <img alt='College Award' className='' src={a4}/>
            <div className='absolute bottom-1 right-96 text-white text-xl'><p className=''>Caption Four</p></div>
        </div>

        {/* Next and previous buttons */}
        <a className='absolute cursor-pointer top-40  left-0 text-blue-500 text-3xl' onClick={moveBackward}>&#10094;</a>
        <a className='absolute cursor-pointer top-40  right-2 text-blue-500 text-3xl' onClick={moveForward}>&#10095;</a>

    </div>
    </div>
  )
}

export default Home