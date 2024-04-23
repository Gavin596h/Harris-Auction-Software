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
    const [bids, setBids] = useState([]);

    const fetchBids = async (auctionNumber) => {
        try {
            const url = `http://localhost:3001/api/bids?auctionNumber=${auctionNumber}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBids(data);
        } catch (error) {
            console.error('There was an error fetching the bids:', error);
        }
    };

    return (
        <div className="App">
            <Router>
                {/* <header>
                  <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
                </header> */}
                <Navbar fetchBids={fetchBids} />

                <Routes>
                  <Route path="/bid-board" exact={true} element={<BidBoard bids={bids} fetchBids={fetchBids} />}/>
                  <Route path="/new-auction" exact={true} element={<NewAuction/>}/>
                  <Route path="/home" exact={true} element={<Home/>}/>

                </Routes>
            </Router>
        </div>
    );
}

export default App;
