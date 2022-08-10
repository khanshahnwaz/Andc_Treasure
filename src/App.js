import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import UserProfile from './Components/UserProfile/UserProfile';
import Routing from './Components/Routes/Routing';
function App() {
  // localStorage.setItem('token','this is me')
  return (
    <div className="App">
      <Routing/>
    </div>
  );
}

export default App;
