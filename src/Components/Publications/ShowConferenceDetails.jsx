import React from 'react'
import Left from '../About/Left';
import Right from '../About/Right';
import Publication from '../Publications/Publication'
const ShowConferenceDetails = () => {
  const details=['Conf. Name','Year','Publisher','ISSN','PaperTitle','Corr. Author','First Author','Presented','National','Place','CoAuthors']
  return (
        // editUrl prop is used to pass in detailedPublication component 
    <div className="  m-2 mx-auto  w-[95vw] md:w-[80vw] min-h-screen">
    {/* <Left/>  */}
    <Publication url='conference/readConferences' name='Conferences' editUrl='conference/updateConference' backUrl='/conferenceDetails' data={details} />
    {/* <Right/> */}
</div>
  )
}

export default ShowConferenceDetails