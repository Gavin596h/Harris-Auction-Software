import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Report from './Report';
import BidBoard from '../pages/BidBoard';
import { NavLink, Link } from 'react-router-dom';


function NewBid({ fetchBids, auctionNumber }) {
    const [bidderNumber, setBidderNumber] = useState('');
    const [tracts, setTracts] = useState([]);
    const [bidAmount, setBidAmount] = useState('');
    const [bidType, setBidType] = useState('InTotal'); // Assuming this affects calculations
    const [currentAuctionNumber, setCurrentAuctionNumber] = useState(null);
    const [recentBidId, setRecentBidId] = useState('');
    const [currentAuction, setCurrentAuction] = useState({
        name: '',
        tractNum: 0
      });
    const [tract, setTract] = useState([Number]);
    const [bids, setBids] = useState([]);
    const [isActive, setActive] = useState();

    // Reset form fields to their default states
    const clearForm = () => {
        setBidderNumber('');
        setTracts([]);
        setBidAmount('');
        setBidType('InTotal');
    };

    useEffect(() => {

        function handleStorageChange() {
            const auctionNumber = localStorage.getItem('currentAuctionNumber');
            if (auctionNumber && auctionNumber !== currentAuctionNumber) {
                setCurrentAuctionNumber(auctionNumber);
                fetchAuction(auctionNumber);
                fetchNewBids();
            }
        }

        window.addEventListener('storage', handleStorageChange);
        setActive(JSON.parse(localStorage.getItem('active')));

        console.log(isActive);

        const auctionNumber = localStorage.getItem('currentAuctionNumber');
        if (!auctionNumber) {
            console.error("Auction number is undefined in NewBid component.");
        }
        setCurrentAuctionNumber(auctionNumber);
        fetchAuction(auctionNumber);
        fetchNewBids();
        console.log("Change to local storage!");
        console.log(auctionNumber);
        setTract(Array.from({length: currentAuction.tractNum}, (_, i) => i + 1))
        console.log(currentAuction.tractNum);
    }, [currentAuctionNumber, currentAuction.tractNum], currentAuction.name);

    useEffect(() => {
        if (auctionNumber) {
            // Do something when auctionNumber changes
            console.log("Auction Number has changed to: ", auctionNumber);
            fetchNewBids(auctionNumber);
        }
    }, [auctionNumber]);
    
    const handleCheckboxChange = (tractNumber) => {
        setTracts(prev => {
            if (prev.includes(tractNumber)) {
                return prev.filter(t => t !== tractNumber);
            } else {
                return [...prev, tractNumber];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentAuctionNumber) {
          alert("Auction number is not available. Cannot submit the bid.");
          return;
        }
        const bid = {
          AuctionNumber: currentAuctionNumber,
          Bidder: parseInt(bidderNumber, 10), 
          Tract: tracts, 
          BidAmount: parseInt(bidAmount),
          ToLead: calculateToLead(),
          PerAcre: calculatePerAcre(),
          BidType: bidType
        };
      
        try {
          const response = await fetch('http://localhost:3001/api/bids', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bid),
          });
          if (response.ok) {
            const createdBid = await response.json();
            setRecentBidId(createdBid._id);
            fetchBids();  // Call this function to update the bids in BidBoard
            clearForm();
            localStorage.setItem('latestBid', JSON.stringify({
                timestamp: new Date().getTime(),
                auctionNumber: currentAuctionNumber
            }));
            console.log('New bid placed, ToLead should now be:', createdBid.ToLead);
          } else {
            const errorResponse = await response.json();
            alert(`Error: ${errorResponse.message}`);
          }
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
    // Placeholder functions - implement calculation logic based on your requirements
    const calculateToLead = () => {
        return 0; // Implement actual logic
    };
    const calculatePerAcre = () => {
        return 0; // Implement actual logic
    };
    const handleDeleteRecentBid = async () => {
        if (!recentBidId) {
            alert("No recent bid to delete.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3001/api/bids/${recentBidId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Assume success if we get here, clear the recent bid ID and refresh the list
            setRecentBidId('');
            fetchBids(auctionNumber); // Assuming fetchBids is passed down from the parent component
        } catch (error) {
            console.error('There was a problem with the delete operation:', error);
        }
    };

    const fetchNewBids = async () => {
        if (!currentAuctionNumber) {
            console.log("Auction number is not available, cannot fetch bids.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3001/api/bids?auctionNumber=${currentAuctionNumber}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bids: ' + response.statusText);
            }
            const bids = await response.json();
            setBids(bids);
        } catch (error) {
            console.error("Error fetching bids:", error);
        }
    };
        
    const fetchAuction = async (a) => {
        try {
            const url = `http://localhost:3001/getAuctionByNumber/${a}`; // updated to auctionCRUDs new method
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCurrentAuction(({
                name: data.AuctionName,
                tractNum: data.TractQuantity
            })); //this gets the auction name from the data pulled from the search
            console.log(currentAuction.tractNum);

        } catch (error) {
            console.error('There was an error fetching the auction:', error);
        }
    }

  


        

    return (
<>
<br></br>
<div>
    <form onSubmit={handleSubmit} className='font-fire'>
        <div className="bg-gray-900 p-4">
            <Link to="/home"> 
                    <button class="bg-red-700 text-white w-full p-2 mb-2 mb-10">Save</button> 
            </Link>
            
            <label htmlFor="BidderNumber" className="text-white">Bid Number</label>
            <input className="w-full p-2 bg-white" type="number" id="BidderNumber" name="BidderNumber" value={bidderNumber} onChange={e => setBidderNumber(e.target.value)}></input>
            <hr></hr>
            <labe  htmlFor="Tracts" className="text-white">Bid Amount</labe>
            <input className="w-full p-2 bg-white"type="number" id="BidAmount" name="BidAmount" value={bidAmount} onChange={e => setBidAmount(e.target.value)} ></input>
            <hr></hr>
            <ul className="grid grid-cols-3 p-0 gap-3" >
            {             
              tract.map((t) => (
                  <li key={t}>
                    <input id={`tract-${t}`} type="checkbox" className="hidden peer" required="" name="Tracts" checked={tracts.includes(t)} onChange={() => handleCheckboxChange(t)}></input>
                    <label for={`tract-${t}`} className=" w-10 h-10 hover:bg-gray-500 hover:text-white bg-gray-100 inline-flex items-center justify-between cursor-pointer peer-checked:text-white peer-checked:bg-red-600 rounded text-gray-900">
                        <div className="block text-center items-center w-full">{`${t}`}</div>
                    </label>
                  </li> 
              ))
            }
            </ul>
            <label htmlFor="BidType" className='text-white mt-5'> Bid Type </label>
            <select id="BidType" name="BidType" className="bg-gray-400 text-white w-full p-2 mb-2" value={bidType} onChange={e => setBidType(e.target.value)}>
                <option value="InTotal">In Total</option>
                <option value="PerAcre">Per Acre</option>
            </select>
                <button className="bg-red-700 text-white w-full p-2 mb-2"  type="submit" id="SubmitBid" name="SubmitBid" onClick={handleSubmit}>Add Bid</button>
                <button  className="bg-gray-400 text-white w-full p-2 mb-2" type="button" id="ClearForm" name="ClearForm" onClick={clearForm}>Clear Form</button>
                <button  className="bg-red-700 text-white w-full p-2 mb-2" type="button" id="DeleteBid" name="DeleteBid" onClick={handleDeleteRecentBid}>Delete Bid</button>

            </div>
            </form>
        </div>
        </>
    );
}
export default NewBid; 