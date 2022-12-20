import React from 'react'
import Left from '../About/Left';
import Right from '../About/Right';
import Publication from '../Publications/Publication'
const ShowJournalDetails = () => {
          // editUrl prop is used to pass in detailedPublication component 
  return (
    <div className="border-8 border-black rounded-xl m-2 flex">
        <Left/><Publication url='journal/readJournals' editUrl='journal/editJournal' backUrl='/journalDetails' name='Journals' publisher='Publisher' id='ISSN' edition='Volume'/><Right/>
    </div>
  )
}

export default ShowJournalDetails