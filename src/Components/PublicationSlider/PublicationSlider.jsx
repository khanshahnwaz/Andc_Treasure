import React from 'react'
import Slider from 'react-slick'
import Card from '../About/Card'
const PublicationSlider = () => {

    const settings={
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        
        
    }
  return (
    <div className='lg:hidden  text-white '>
        <Slider {...settings}>
        <Card color='bg-yellow-300  rounded-2xl  px-3' pub='Books' path='/bookDetails'/>
       <Card color='bg-red-300  rounded-2xl  px-3' pub='Chapters' path='/chapterDetails'/>
        <Card color='bg-green-300  rounded-2xl px-3' pub='Journals' path='/journalDetails'/>
        <Card color='bg-indigo-300  rounded-2xl px-3' pub='Conferences' path='/conferenceDetails'/>
        </Slider>
    </div>
  )
}

export default PublicationSlider