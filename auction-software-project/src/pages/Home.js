import NewBid from '../components/NewBid';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {


    const [pastAuctions, setPastAuctions] = useState([]);


    useEffect(() => {
        const fetchPastAuctions = async () => {
          try {
            const response = await fetch('http://localhost:3001/pastAuctions');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const auctions = await response.json();
            setPastAuctions(auctions);
          } catch (error) {
            console.error('Failed to fetch past auctions:', error);
          }
        };
        fetchPastAuctions();
      }, []);

      const setAuctionNum = (a) => {
        

        window.localStorage.setItem('currentAuctionNumber', a.AuctionNumber);
        window.dispatchEvent(new Event("storage"));

        console.log(a)
        localStorage.setItem('selectedAuction', a.AuctionName);
        localStorage.setItem('tractNum', a.TractQuantity)
        console.log(a.TractQuantity);
    
      }

    return    (
        <div className="p-4 sm:ml-64 font-fira">
            <ul className="p-0">
                {pastAuctions.map(auction => 
                <li key ={auction.AuctionNumber} className="bg-gray-200 p-4 w-full mb-3">
                    <div className="w-6/12">
                        <h3>{auction.AuctionName}</h3>
                        <p>Date: {auction.AuctionDate}</p>
                        <p>Tracts: {auction.TractQuantity}</p>
                        <p>{auction.AuctionNumber}</p>
                    </div>
                    <div className="w-6/12">
                        <button className="m-2 p-3 bg-red-700 text-white">Remove</button>
                        <button className="m-2 p-3 bg-red-700 text-white">Edit</button>
                        <Link to={{
                          pathname: "/bid-board",
                          state: { selectedAuction: auction }  // Ensure this matches the object key used in BidBoard.js
                        }}>
                          <button className="m-2 p-3 bg-red-700 text-white" onClick={setAuctionNum.bind(this, auction)}>Start</button>
                        </Link>
                    </div>
                </li>
                )}
            </ul>
    </div>

    )
}

export default Home 