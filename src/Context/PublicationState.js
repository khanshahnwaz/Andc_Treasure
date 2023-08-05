import { createContext, useState } from "react";
const PublicationContext = createContext();
const PublicationState = (props) => {

    // state to hold the name of the user, display on home page
    const[loggedInName,setLoggedInName]=useState('Andc_Treasure')
    // state to open addBook form
    const [addBook, setAddBook] = useState(false);
    // state to open addJournal form
    const [addJournal, setAddJournal] = useState(false);
    // state to open addConference form
    const [addConference, setAddConference] = useState(false);
    // state to open addChapter form
    const[addChapter,setAddChapter]=useState(false);
    // state to keep track of delete or edit event
    const [warningMessage, setWarningMessage] = useState(null);
    // state to enable or disable the successfull modal box
    const [successMessage, setSuccessMessage] = useState(null);
    // state to enable or disable the error modal box
    const [errorMessage, setErrorMessage] = useState(null);
    // state to keep the id of the target publication in order to delete or update
    const [targetId, setTargetId] = useState(null);
    // state to keep the edition of the publication going to be changed
    const [targetPublication, setTargetPublication] = useState(null)
    // state to know the user has confirmed the operation in positive or negative
    const [goAhead, setGoAhead] = useState(false)
    // state to display the editForm for Book
    const [callEditBook, setCallEditBook] = useState(false)
    // state to display the editForm for Journal
    const [callEditJournal, setCallEditJournal] = useState(false)
    // state to display the editForm for Conference
    const [callEditConference, setCallEditConference] = useState(false)
    
     // state to display the editForm for BookChapter
     const [callEditChapter, setCallEditChapter] = useState(false)

    // state to run the delete component for Book
    const [callDeleteBook, setCallDeleteBook] = useState(false)
    // state to run the delete component for Journal
    const [callDeleteJournal, setCallDeleteJournal] = useState(false)
    // state to run the delete component for Conference
    const [callDeleteConference, setCallDeleteConference] = useState(false)
    // state to run the delete component for Chapter
    const [callDeleteChapter, setCallDeleteChapter] = useState(false)


    // state to enable or disable the detailed card of the publication
    const[detailedPublication,setDetailedPublication]=useState(false);
    // state to hold the data that will upate the existing publication
    // doing this because I want to send the request only after confirmation of user
    const [editData, setEditData] = useState({})


    // now I need to maintain three hooks that keep track of which publication is clicked to view in detailed format.
    const[bookIndex,setBookIndex]=useState();
    const[chapterIndex,setChapterIndex]=useState();
    const[journalIndex,setJournalIndex]=useState();
    const[conferenceIndex,setConferenceIndex]=useState();
    return (
        <PublicationContext.Provider value={{
            bookIndex:bookIndex,
            setBookIndex:setBookIndex,
            chapterIndex:chapterIndex,
            setChapterIndex:setChapterIndex,
            journalIndex:journalIndex,
            setJournalIndex:setJournalIndex,
            conferenceIndex:conferenceIndex,
            setConferenceIndex:setConferenceIndex,
            loggedInName:loggedInName,
            setLoggedInName:setLoggedInName,
             warningMessage: warningMessage, setWarningMessage: setWarningMessage, targetId: targetId, setTargetId: setTargetId, goAhead: goAhead, setGoAhead: setGoAhead,
         callEditBook: callEditBook, 
         setCallEditBook: setCallEditBook, 
         callEditChapter:callEditChapter,
         setCallEditChapter:setCallEditChapter,
         callEditJournal: callEditJournal,
          setCallEditJournal: setCallEditJournal, 
          callEditConference: callEditConference,
           setCallEditConference: setCallEditConference,
            editData: editData,
             setEditData: setEditData,
              targetPublication: targetPublication, 
              setTargetPublication: setTargetPublication, callDeleteBook: callDeleteBook,
               setCallDeleteBook: setCallDeleteBook, callDeleteChapter:callDeleteChapter,setCallDeleteChapter:setCallDeleteChapter, callDeleteJournal: callDeleteJournal, setCallDeleteJournal: setCallDeleteJournal, callDeleteConference: callDeleteConference, setCallDeleteConference: setCallDeleteConference, successMessage: successMessage,
                setSuccessMessage: setSuccessMessage, 
                errorMessage: errorMessage,
                 setErrorMessage: setErrorMessage,
                  addBook: addBook,
                   setAddBook: setAddBook,
                   addChapter:addChapter,
                   setAddChapter:setAddChapter,
                    addJournal: addJournal,
                     setAddJournal: setAddJournal, 
                     addConference: addConference,
                      setAddConference: setAddConference,detailedPublication:detailedPublication,setDetailedPublication:setDetailedPublication }}>
            {props.children}
        </PublicationContext.Provider>
    )
}
export { PublicationContext, PublicationState };