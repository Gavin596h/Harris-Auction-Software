import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const NewBid = ({ fetchBids }) => {
    const [bidderNumber, setBidderNumber] = useState('');
    const [tracts, setTracts] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [bidType, setBidType] = useState('InTotal'); // Assuming this affects calculations
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    

    // Reset form fields to their default states
    const clearForm = () => {
        setBidderNumber('');
        setTracts('');
        setBidAmount('');
        setBidType('InTotal');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Here, calculate the "toLead" and "perAcre" as necessary before sending
        const toLead = calculateToLead(); // This needs actual implementation
        const perAcre = calculatePerAcre(); // This too

        const bid = {
            Bidder: bidderNumber, 
            Tract: tracts, 
            BidAmount: bidAmount,
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

            // Here you might want to add the new bid to local state to update UI
            fetchBids(createdBid);
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

    return (

<>

<button onClick={handleShow} className="bg-red-600 py-4 px-4 rounded text-white absolute bottom-10 right-10">
  New Bid
</button>

<Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <form onSubmit={handleSubmit}>
                <label htmlFor="BidderNumber">Bidder Number</label>
                <input type="number" id="BidderNumber" name="BidderNumber" value={bidderNumber} onChange={e => setBidderNumber(e.target.value)} />

                <label htmlFor="Tracts">Tracts Being Bid On</label>
                <input type="text" id="Tracts" name="Tracts" value={tracts} onChange={e => setTracts(e.target.value)} />

                <label htmlFor="BidAmount">Bid Amount</label>
                <input type="number" id="BidAmount" name="BidAmount" value={bidAmount} onChange={e => setBidAmount(e.target.value)} />

                <label htmlFor="BidType">Bid Type</label>
                <select id="BidType" name="BidType" value={bidType} onChange={e => setBidType(e.target.value)}>
                    <option value="InTotal">In Total</option>
                    <option value="PerAcre">Per Acre</option>
                </select>
            </form>
            <br></br>
            <button type="submit" id="SubmitBid" name="SubmitBid" className="bg-red-600 py-2 px-4 rounded text-white mr-5">Submit Bid</button>
            <button type="button" id="ClearForm" name="ClearForm" className="bg-gray-600 py-2 px-4 rounded text-white"onClick={clearForm}>Clear Form</button>

  </Modal.Body>
</Modal>
</>





    );
}


export default NewBid; 