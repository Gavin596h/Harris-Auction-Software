import React, { useState, useEffect } from "react"


const SettlementReport =  React.forwardRef((props, ref) => {
    const [bids, setBids] = useState([]);
    const [high, setHigh] = useState([]);


    const fetchBids = async () => {
        try {
            const auctionNumber = localStorage.getItem('currentAuctionNumber');
            const url = `http://localhost:3001/api/bids?auctionNumber=${auctionNumber}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBids(data);
            setHigh(bids.filter((b) => b === props));
            console.log(JSON.stringify(props));
        } catch (error) {
            console.error('There was an error fetching the bids:', error);
        }
    };
    
    useEffect(() => {
        fetchBids();
    }, []);

    return(
    
        <table className="w-full text-sm text-black right-0 border-collapse" ref={ref}>
            <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:text-white">
                <tr>
                    <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">Bidder Number</th>
                    <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">Bid Amount</th>
                    <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">To Lead</th>
                    <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">Per Acre</th>
                    <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">High</th>
                    <th scope="col" className="px-6 py-3">Tract</th>
                </tr>
            </thead>
            <tbody>
                {high.map((bid, index) => (
                    <tr key={index}>
                        <td className="border-gray-400 border-r-2 px-6">{bid.Bidder}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.BidAmount.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0})}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.ToLead ? bid.ToLead.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0}) : "$0"}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.PerAcre ? bid.PerAcre.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2}) : "$0"}</td>                            <td className="border-gray-400 border-r-2 px-6 py-4">{bid.High ? 'Yes' : 'No'}</td>
                        <td className="border-gray-400 px-6 py-4">
                            {bid.Tract.map(t => <span key={t} className='p-2 m-2 text-white bg-gray-300'>{t}</span>)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      )
      
    })
  

export default SettlementReport;