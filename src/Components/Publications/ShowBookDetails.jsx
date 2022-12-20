import React from 'react'
import Left from '../About/Left';
import Right from '../About/Right';
import Publication from '../Publications/Publication'
const  ShowBookDetails= () => {
  return (
    // editUrl prop is used to pass in detailedPublication component 
    <div className="border-8 border-black rounded-xl m-2 flex">
        <Left/><Publication url='book/readBooks' backUrl='/bookDetails' name='Books' publisher='Publisher' id='ISBN' edition='Edition' editUrl='book/editBook'/><Right/>
    </div>
  )
}

export default ShowBookDetails;