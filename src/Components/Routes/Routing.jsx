import Home from "../Home/Home";
import SignUp from '../SignUp/Signup';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "../Login/Login";

const routing=()=>{
    return(
    <Router> 
        <Header/>      
    <Routes> 
        
        <Route path='/' element={<Home/>}/>
        <Route path='/signUp' element={<SignUp/>}/>   
        <Route path='/login' element={<Login/>}/>   

    </Routes>  
    <Footer/>
    </Router>
    );
}
export default routing;