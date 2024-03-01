import { useState } from 'react';
import Navbar from './components/Navbar'
import { GiHamburgerMenu } from 'react-icons/gi'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewAuction from './pages/NewAuction';
import Home from './pages/Home';
import BidBoard from './pages/BidBoard';

function App() {
  const [ showNav, setShowNav ] = useState(false)

  return (
    <div className="App">
      <Router>
        {/* <header>
          <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
        </header> */}

        <Navbar/>
        <Routes>
          <Route path="/bid-board" exact={true} element={<BidBoard/>}/>
          <Route path="/new-auction" exact={true} element={<NewAuction/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
