import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Report from './Report';

const NewBid = ({ fetchBids, auctionNumber }) => {
    const [bidderNumber, setBidderNumber] = useState('');
    const [tracts, setTracts] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [bidType, setBidType] = useState('InTotal'); // Assuming this affects calculations
    const [show, setShow] = useState(false);
    const [recentBidId, setRecentBidId] = useState('');
    

    // Reset form fields to their default states
    const clearForm = () => {
        setBidderNumber('');
        setTracts('');
        setBidAmount('');
        setBidType('InTotal');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const TractNumbers = tracts.split(',').map(Number);

        // Here, calculate the "toLead" and "perAcre" as necessary before sending
        const toLead = calculateToLead(); // This needs actual implementation
        const perAcre = calculatePerAcre(); // This too

        console.log("Submitting bid for auctionNumber:", auctionNumber);

        const bid = {
            AuctionNumber: auctionNumber,
            Bidder: parseInt(bidderNumber, 10), 
            Tract: TractNumbers, 
            BidAmount: parseInt(bidAmount),
            ToLead: toLead,
            PerAcre: perAcre,
            // Include any other fields required by your schema
        };

        try {
            const response = await fetch('http://localhost:3001/api/bids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bid),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const createdBid = await response.json();
            setRecentBidId(createdBid._id);
            fetchBids(auctionNumber); // Refresh the bid list
            clearForm();
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

    return (
        <>
    <aside className='font-fira fixed top-0 left-0 z-40 w-64 h-screen'>
        <div className="bg-gray-800 p-4">
            <label className="text-white">Bid amount</label>
            <input className="w-full p-2"></input>
            <hr></hr>
            <labe className="text-white">Bid Number</labe>
            <input className="w-full p-2"></input>
            <hr></hr>
            <ul className="grid grid-cols-3 p-0 gap-3">
                <li>
                    <input id="1" type="checkbox" value="" class="hidden peer" required=""></input>
                    <label for="1" className=" w-10 h-10 hover:bg-gray-500 hover:text-white bg-gray-100 inline-flex items-center justify-between cursor-pointer peer-checked:text-white peer-checked:bg-red-600 rounded text-gray-900">
                        <div className="block text-center items-center w-full">1</div>
                    </label>
                </li>
            </ul>
            <button className="bg-red-700 text-white w-full p-2">Add Bid</button>
            </div>
        </aside>
      
        <form onSubmit={handleSubmit}>
            <label htmlFor="BidderNumber"> Bidder Number </label>
            <input type="number" id="BidderNumber" name="BidderNumber" value={bidderNumber} onChange={e => setBidderNumber(e.target.value)} />

            <label htmlFor="Tracts"> Tracts Being Bid On </label>
            <input type="text" id="Tracts" name="Tracts" value={tracts} onChange={e => setTracts(e.target.value)} />

            <label htmlFor="BidAmount"> Bid Amount </label>
            <input type="number" id="BidAmount" name="BidAmount" value={bidAmount} onChange={e => setBidAmount(e.target.value)} />

            <label htmlFor="BidType"> Bid Type </label>
            <select id="BidType" name="BidType" value={bidType} onChange={e => setBidType(e.target.value)}>
                <option value="InTotal">In Total</option>
                <option value="PerAcre">Per Acre</option>
            </select>

            <button type="submit" id="SubmitBid" name="SubmitBid"> Submit Bid </button>
            <button type="button" id="ClearForm" name="ClearForm" onClick={clearForm}> Clear Form </button>
            <button type="button" id="DeleteRecent" name="DeleteRecent" onClick={handleDeleteRecentBid}> Delete </button>
        </form>
        </>
    );
}

export default NewBid; 