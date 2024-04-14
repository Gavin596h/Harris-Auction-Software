import React, { useState, useEffect, useRef, Props } from 'react';
import NewBid from '../components/NewBid';
import Report from '../components/Report';
import ReactToPrint from "react-to-print";


function BidBoard() {
  const [bids, setBids] = useState([]);

  const [currentAuctionNumber, setCurrentAuctionNumber] = useState(null);
  const ref = useRef();

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

  
const BoardPrint = React.forwardRef((props, ref) => {
  
  return(
    <div className="p-4 font-fira h-screen" ref={ref}>
    <table className="w-full text-sm text-black table-auto right-0">
        <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:text-white">
            <tr>
                <th scope="col" className="px-6 py-3 border-r-2 border-gray-400 ">
                    Bujujgyugyujgygjgjh
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
            <tr key={index}>
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
      
    </div>
  )
  
})



 

  return (
    <>
          <div className="p-4 sm:ml-64 font-fira dark:bg-gray-800 h-screen">
            <h2>Testing name</h2>
            <table className="w-full text-sm text-white right-0 border-collapse	">
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
                    <tr key={index} className="bg-black">
                        <td className="border-gray-400 border-r-2 px-6">{bid.Bidder}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.BidAmount}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.ToLead}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.PerAcre}</td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">{bid.High ? 'Yes' : 'No'}</td>
                        <td className="border-gray-400 px-6 py-4">{bid.Tract}</td>
                    </tr>
                ))} 

                </tbody>
            </table>
            <ReactToPrint
              content={() => ref.current}
              trigger={() => (
                  <button>
                        Print
                  </button>
              )}
            />        
            <div style={{display: "none"}}>
                <BoardPrint ref={ref}></BoardPrint>
            </div>
            </div>
        </ >
  );
}

export default BidBoard;