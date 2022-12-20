import React from 'react'
import Left from '../About/Left';
import Right from '../About/Right';
import Publication from '../Publications/Publication'
const ShowConferenceDetails = () => {
  return (
        // editUrl prop is used to pass in detailedPublication component 
    <div className="border-8 border-black rounded-xl m-2 flex">
    <Left/> <Publication url='conference/readConferences' editUrl='conference/editConference' backUrl='/conferenceDetails' name='Conferences' publisher='Organizer' id='CID' edition='Proceedings'/><Right/>
</div>
  )
}

export default ShowConferenceDetails