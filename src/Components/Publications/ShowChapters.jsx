import React from 'react'
import Left from '../About/Left';
import Right from '../About/Right';
import Publication from '../Publications/Publication'
const  ShowChapterDetails= () => {
  const details=['BookName','Year','Publisher','ISBN','ChapterTitle','BookTitle','Editor','Edition','Area']
  return (
    // editUrl prop is used to pass in detailedPublication component 
    <div className=" m-2 mx-auto  w-[95vw] md:w-[80vw] min-h-screen ">
        {/* <Left/> */}
        <Publication url='BookChapter/readChapters' backUrl='/chapterDetails' name='Chapter' editUrl='book/editChapter' data={details}/>
        {/* <Right/> */}
    </div>
  )
}

export default ShowChapterDetails;