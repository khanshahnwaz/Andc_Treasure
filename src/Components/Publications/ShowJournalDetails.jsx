import React from 'react'
import Left from '../About/Left';
import Right from '../About/Right';
import Publication from '../Publications/Publication'
const ShowJournalDetails = () => {
          // editUrl prop is used to pass in detailedPublication component 
      const details=['Name','Year','Publisher','ISSN','Title','Volume','Corr.Author','FirstAuthor','CoAuthors']
  return (
    <div className="  m-2 mx-auto  w-[95vw] md:w-[80vw] min-h-screen">
        {/* <Left/> */}
        <Publication url='journal/readJournals' name='Journals' editUrl='journal/editJournal' backUrl='/journalDetails'
        data={details}/>
        {/* <Right/> */}
    </div>
  )
}

export default ShowJournalDetails