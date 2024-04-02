import React, { useState, useEffect } from 'react';
import NewBid from '../components/NewBid';

function BidBoard() {
  const [bids, setBids] = useState([]);

  const [currentAuctionNumber, setCurrentAuctionNumber] = useState(null);

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

  useEffect(() => {
    const auctionNumber = localStorage.getItem('currentAuctionNumber');
    setCurrentAuctionNumber(auctionNumber);
    fetchBids(auctionNumber);
  }, []);

  return (
          <div className="p-4 sm:ml-64 font-fira">
            <table className="w-full text-sm text-gray-500 dark:text-white table-auto right-0">
                <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400 ">
                            Bidder Number
                        </th>
                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">
                            Bid Amount
                        </th>
                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">
                            To Lead
                        </th>
                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">
                            Per Acre
                        </th>
                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">
                            High
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tract
                        </th>
                    </tr>
                </thead>
                <tbody>
                {bids.map((bid, index) => (
                    <tr key={index} className="dark:bg-black">
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.Bidder}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.BidAmount}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.ToLead}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.PerAcre}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.High ? 'Yes' : 'No'}</td>
                        <td className="border-gray-400 px-6 py-4">{bid.Tract}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <NewBid fetchBids={fetchBids} auctionNumber={currentAuctionNumber}></NewBid>
        </div>
  );
}

export default BidBoard;
