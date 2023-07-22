import React from 'react'
import Left from '../About/Left';
import Right from '../About/Right';
import Publication from '../Publications/Publication'
const  ShowBookDetails= () => {
  const details=['BookName','Year','Publisher','ISBN','Title','Editor','Edition','Area','CoAuthors']
  return (
    // editUrl prop is used to pass in detailedPublication component 
    <div className=" m-2 mx-auto  w-[95vw] md:w-[80vw] min-h-screen">
        {/* <Left/> */}
        <Publication url='book/readBooks' backUrl='/bookDetails' name='Books' editUrl='book/editBook' data={details}/>
        {/* <Right/> */}
    </div>
  )
}

export default ShowBookDetails;