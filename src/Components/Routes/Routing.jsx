    import Home from "../Home/Home";
    import SignUp from '../SignUp/Signup';
    import Header from '../Header/Header';
    import Footer from '../Footer/Footer';
    import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
    import Login from "../Login/Login";
    import About from "../About/About";
    import Contact from "../ContactUs/Contact";
    import Admin from "../Admin/AdminPublications";
    import ShowBookDetails from "../Publications/ShowBookDetails";
    import ShowChapterDetails from "../Publications/ShowChapters";
    import ShowJournalDetails from "../Publications/ShowJournalDetails";
    import ShowConferenceDetails from "../Publications/ShowConferenceDetails";
import {PublicationState} from "../../Context/PublicationState";

import BookCard from "../Publications/Cards/BookCard";
import LandingPage from "../Admin/LandingPage";
import ShowCaseTable from "../Admin/ShowcaseBooks/ShowCaseTable";
import ShowcaseChapters from '../Admin/ShowcaseChapters/ShowcaseChapters';
import ShowcaseJournals from '../Admin/ShowcaseJournals/ShowcaseJournals';
import ShowcaseConferences from '../Admin/ShowcaseConferences/ShowcaseConferences';

import DetailedPublication from "../Admin/DetailedPublication/DetailedPublication";

    const routing=()=>{
        return(
            <PublicationState>
        <Router basename={process.env.PUBLIC_URL}> 
            <Header/>      
        <Routes> 
            
            <Route path='/' element={<Home/>}/>
            <Route path='/signUp' element={<><SignUp/><Home/></>}/>   
            <Route path='/login' element={<><Login/><Home/></>}/>
            <Route path='/profile' element={<About/>}/>
            <Route path="/admin" element={<LandingPage/>}/>
            <Route path='/contactUs' element={<><Contact/><Home/></>}/>
            <Route path='/bookDetails' element={<ShowBookDetails/>}/>
            <Route path='/chapterDetails' element={<ShowChapterDetails/>}/>
    <Route path='/journalDetails' element={<ShowJournalDetails/>}/>
    <Route path='/conferenceDetails' element={<ShowConferenceDetails/>}/>

    <Route path="/admin/bookDetails" element={<ShowCaseTable/>}/>
    <Route path="/admin/chapterDetails" element={<ShowcaseChapters/>}/>
    <Route path="/admin/journalDetails" element={<ShowcaseJournals/>}/>
    <Route path="/admin/conferenceDetails" element={<ShowcaseConferences/>}/>

    <Route path="/admin/bookDetails/detailedBook" element={<DetailedPublication/>}/>
    <Route path="/admin/chapterDetails/detailedChapter" element={<DetailedPublication/>}/>
    <Route path="/admin/journalDetails/detailedJournal" element={<DetailedPublication/>}/>
    <Route path="/admin/conferenceDetails/detailedConference" element={<DetailedPublication/>}/>

    {/* <Route path='/bookDetails/book/readBooks/add' element={<Add/>}/> */}
        </Routes>  
        
        <Footer/>
        </Router>
        </PublicationState>
        );
    }
    export default routing;