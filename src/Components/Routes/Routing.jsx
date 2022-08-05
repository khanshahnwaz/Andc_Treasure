import Home from "../Home/Home";
import SignUp from '../SignUp/Signup';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "../Login/Login";
import About from "../About/About";

const routing=()=>{
    return(
    <Router> 
        <Header/>      
    <Routes> 
        
        <Route path='/' element={<Home/>}/>
        <Route path='/signUp' element={<SignUp/>}/>   
        <Route path='/login' element={<Login/>}/>   
        <Route path='/about' element={<About/>}/>
    </Routes>  
    <Footer/>
    </Router>
    );
}
export default routing;