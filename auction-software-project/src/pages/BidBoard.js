import React, { useState, useEffect, useRef } from 'react';
import NewBid from '../components/NewBid';
import Report from '../components/Report';
import ReactToPrint from "react-to-print";
import { useLocation } from "react-router-dom";

function BidBoard() {
  const [bids, setBids] = useState([]);
  const [currentAuctionNumber, setCurrentAuctionNumber] = useState(null);
  const [currentAuction, setCurrentAuction] = useState();
  const [high, setHigh] = useState();

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

  const isHigh = (b) => {
    if(b.High) {
        setHigh(b);
    }
  }




  useEffect(() => {
    const auctionNumber = localStorage.getItem('currentAuctionNumber');
    setCurrentAuctionNumber(auctionNumber);
    fetchBids(auctionNumber)


    const fetchAuction = async () => {
        try {
            const url = `http://localhost:3001/getAuction?auctionNumber=${9}`;
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCurrentAuction(data);
          } catch (error) {
            console.error('There was an error fetching the bids:', error);
          }
      }

    fetchAuction();
    console.log(currentAuction)
    console.log("here I am");

  }, []);

  const SettlementPrint = React.forwardRef((props, refS) => {
    return(
        // <div className="p-7 font-fira h-screen" refS={refS}>
    <h2 className='text-black'>Test Auction</h2>
        //     <p>April 1, 2024</p>
        //     <hr></hr>
        //     <p>Bid No. - {high.Bidder}</p>
        //     <p>Bid Amount - {high.BidAmount}</p>
        //     <p>Deposit - {high.BidAmount * 0.4}</p>
        //     <p>Due - {(high.BidAmount * 0.4) + high.BidAmount}</p>
        // </div>
    )

  })
  
const BoardPrint = React.forwardRef((props, ref) => {


  return(
    <div className="p-7 font-fira h-screen" ref={ref}>
    <h2 className='text-black'>Test Auction</h2>
    <p>April 1, 2024</p>
    <table className="w-full text-sm text-black table-auto right-0">
        <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:text-white">
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
                    <tr className=" dark:bg-black">
                        <th scope="row" className="border-gray-400 border-r-2 px-6 py-4 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            1
                        </th>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td class="border-gray-400 border-r-2 px-6 py-4">
                            $5
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $0.75
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td className=" border-gray-400 border-r-2 px-6 py-4">
                            <span className='p-2 m-2'>1</span>
                            <span className='p-2 m-2'>2</span>
                        </td>
                    </tr>
                    <tr className=" dark:bg-black">
                        <th scope="row" className="border-gray-400 border-r-2 px-6 py-4 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            2
                        </th>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td class="border-gray-400 border-r-2 px-6 py-4">
                            $5
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $0.75
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td className=" border-gray-400 border-r-2 px-6 py-4">
                            <span className=' p-2 m-2'>3</span>
                            <span className=' p-2 m-2'>4</span>
                            <span className=' p-2 m-2'>5</span>
                        </td>
                    </tr>
                    <tr className=" dark:bg-black">
                        <th scope="row" className="border-gray-400 border-r-2 px-6 py-4 bg-gray-200 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            3
                        </th>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $100
                        </td>
                        <td class="border-gray-400 border-r-2 px-6 py-4">
                            $5
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $0.75
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td className=" border-gray-400 border-r-2 px-6 py-4">
                            <span className=' p-2 m-2'>7</span>
                        </td>
                    </tr>
                    <tr className=" dark:bg-black">
                        <th scope="row" className="border-gray-400 border-r-2 px-6 py-4 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            4
                        </th>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td class="border-gray-400 border-r-2 px-6 py-4">
                            $5
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $0.75
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td className=" border-gray-400 border-r-2 px-6 py-4">
                            <span className='p-2 m-2'>8</span>
                            <span className='p-2 m-2'>9</span>
                        </td>
                    </tr>
                    <tr className=" dark:bg-black">
                        <th scope="row" className="border-gray-400 border-r-2 px-6 py-4 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            5
                        </th>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td class="border-gray-400 border-r-2 px-6 py-4">
                            $5
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $0.75
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td className=" border-gray-400 border-r-2 px-6 py-4">
                            <span className=' p-2 m-2'>10</span>
                        </td>
                    </tr>

                </tbody>
        </table>
    </div>
  )
  
})



 

  return (
    <>
          <div className="p-4 sm:ml-64 font-fira dark:bg-gray-800 h-screen">
            <div>
                <h2 className='text-white'>{currentAuction}</h2>
                <ReactToPrint
                content={() => ref.current}
                trigger={() => (
                    <button className='p-2 bg-red-600 text-white'>
                            Print Report
                    </button>
                )}
                />    
                <ReactToPrint
                content={() => ref.current}
                trigger={() => (
                    <button className='p-2 bg-red-600 text-white m-2'>
                            Settlement
                    </button>
                )}
                />    
            </div>
        
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
     
            <div style={{display: "none"}}>
                <BoardPrint ref={ref}></BoardPrint>
            </div>
            <div style={{display: "none"}}>
                <SettlementPrint ref={ref}></SettlementPrint>
            </div>
          
            </div>
        </ >
  );
}

export default BidBoard;