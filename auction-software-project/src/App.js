import { useState } from 'react';
import Navbar from './components/Navbar'
import { GiHamburgerMenu } from 'react-icons/gi'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewAuction from './pages/NewAuction';
import Home from './pages/Home';

function App() {
  const [ showNav, setShowNav ] = useState(false)

  return (
    <div className="App">
      <Router>
        <header>
          <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
        </header>

        <Navbar show={showNav}/>
        <Routes className='main'>
          <Route path="/" exact={true} element={<Home/>}/>
          <Route path="/new-auction" exact={true} element={<NewAuction/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
