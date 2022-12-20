    import Home from "../Home/Home";
    import SignUp from '../SignUp/Signup';
    import Header from '../Header/Header';
    import Footer from '../Footer/Footer';
    import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
    import Login from "../Login/Login";
    import About from "../About/About";
    import Contact from "../ContactUs/Contact";
    import ShowBookDetails from "../Publications/ShowBookDetails";
    import ShowJournalDetails from "../Publications/ShowJournalDetails";
    import ShowConferenceDetails from "../Publications/ShowConferenceDetails";
import {PublicationState} from "../../Context/PublicationState";
    const routing=()=>{
        return(
            <PublicationState>
        <Router> 
            <Header/>      
        <Routes> 
            
            <Route path='/' element={<Home/>}/>
            <Route path='/signUp' element={<><SignUp/><Home/></>}/>   
            <Route path='/login' element={<><Login/><Home/></>}/>
            <Route path='/profile' element={<About/>}/>
            <Route path='/contactUs' element={<><Contact/><Home/></>}/>
            <Route path='/bookDetails' element={<ShowBookDetails/>}/>
    <Route path='/journalDetails' element={<ShowJournalDetails/>}/>
    <Route path='/conferenceDetails' element={<ShowConferenceDetails/>}/>
    {/* <Route path='/bookDetails/book/readBooks/add' element={<Add/>}/> */}
        </Routes>  
        
        <Footer/>
        </Router>
        </PublicationState>
        );
    }
    export default routing;