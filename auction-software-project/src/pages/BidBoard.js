import React, { useState, useEffect, useRef } from 'react';
import NewBid from '../components/NewBid';
import Report from '../components/Report';
import SettlementReport from '../components/SettlementReport';
import ReactToPrint from "react-to-print";
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { FaRegCalendarAlt } from "react-icons/fa";
import {RiAuctionFill} from 'react-icons/ri'
import { TbReportAnalytics } from "react-icons/tb";
import { MdHome, MdOutlineDashboard } from "react-icons/md";
import { Button, Modal } from "flowbite-react";


function BidBoard({ bids, fetchBids }) {
    const [totalBids, setTotalBids] = useState('');
    const [totalPerAcre, setTotalPerAcre] = useState('');
    const [currentAuctionNumber, setCurrentAuctionNumber] = useState(localStorage.getItem('currentAuctionNumber'));
    const [currentAuction, setCurrentAuction] = useState({
        name: '',
        tractNum: 0
    });

    const refReport = useRef();
    const refSettlement = useRef();
    const [showModal, setShowModal] = useState(false);

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
                tractNum: data.TractAcres
            })); //this gets the auction name from the data pulled from the search
        } catch (error) {
            console.error('There was an error fetching the auction:', error);
        }
    }

    useEffect(() => {
        setTotalPerAcre(bids.reduce((acc, bid) => {
            if(bid.High){
                return acc + bid.PerAcre;
            }
            return acc;
        }, 0))
    }, [bids])

    useEffect(() => {
        setTotalBids(bids.reduce((acc, bid) => {
            if(bid.High){
                return acc + bid.BidAmount;
            }
            return acc;
        }, 0))
    }, [bids])

    useEffect(() => {
        const handleStorageChange = event => {
            if (event.key === 'latestBid') {
                const latestBid = JSON.parse(event.newValue);
                if (latestBid && latestBid.auctionNumber === currentAuctionNumber) {
                    fetchBids(currentAuctionNumber);
                }
            }
        };
    
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [currentAuctionNumber, fetchBids]);

    useEffect(() => {
        const auctionNumber = localStorage.getItem('currentAuctionNumber');
        if (auctionNumber) {
            setCurrentAuctionNumber(auctionNumber);
            fetchBids(auctionNumber);
            fetchAuction(auctionNumber);
        }
    }, [fetchBids]);


  return (
    <>
        <aside className='font-fira fixed top-0 left-0 z-40 w-64 h-screen'>
            <div className='h-full overflow-y-auto py-5 px-3 bg-gray-900'>         
            <ul className="pl-0 space-y-1">
                <NewBid></NewBid>

                    </ul>
            </div>
        </aside>
          <div className="p-4 sm:ml-64 font-fira bg-gray-800 h-screen">
            <div>
                <h2 className='text-white'>{currentAuction.name}</h2>
                <ReactToPrint
                content={() => refReport.current}
                trigger={() => (
                    <button className='p-2 bg-red-700 text-white'>
                            Print Report
                    </button>
                )}
                />    
                {/* <button className='p-2 bg-red-600 text-white m-2'>
                            Settlement Report
                </button> */}

        <button
            className="p-2 bg-red-600 text-white m-2"
            type="button"
            onClick={() => setShowModal(true)}
        >
            Settlement Report
        </button>
       {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b">
                <ReactToPrint
                content={() => refSettlement.current}
                trigger={() => (
                    <button className='p-2 bg-red-600 text-white m-2'>
                            Settlement
                    </button>
                )}
                />
            



                </div>
              </div>
              <button
                    className="p-2 bg-red-600 text-white m-2"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
            </div>
          </div>
        </>
      ) : null}








                <ReactToPrint
                content={() => refSettlement.current}
                trigger={() => (
                    <button className='p-2 bg-red-700 text-white m-2'>
                            Settlement
                    </button>
                )}
                />
                <p className='inline-block'><span className="text-white p-2 m-2 bg-gray-600">Total:  {totalBids.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span><span  className="text-white p-2 bg-gray-600">Per Acre:  {totalPerAcre.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            
            </div>
        
            <table className="w-full text-sm text-white right-0 border-collapse">
                <thead className="w-full text-xsuppercase bg-gray-900 text-white">
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
                    {bids.map((bid, index) => (
                        <tr key={index} className={bid.High ? 'bg-gray-600' : 'bg-black'}>
                            <td className="border-gray-400 border-r-2 px-6">{bid.Bidder}</td>
                            <td className="border-gray-400 border-r-2 px-6 py-4">{bid.BidAmount.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0})}</td>
                            <td className="border-gray-400 border-r-2 px-6 py-4">{bid.ToLead ? bid.ToLead.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0}) : "$0"}</td>
                            <td className="border-gray-400 border-r-2 px-6 py-4">{bid.PerAcre ? bid.PerAcre.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2}) : "$0"}</td>                            
                            <td className="border-gray-400 border-r-2 px-6 py-4">{bid.High ? 'Yes' : 'No'}</td>
                            <td className="border-gray-400 px-6 py-4">
                                {bid.Tract.map(t => <span key={t} className={bid.High ? 'bg-white text-black p-2 m-1' : 'bg-gray-700 p-2 m-1'}>{t}</span>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
     
            <div style={{display: "none"}}>
                <Report ref={refReport}></Report>
            </div>
            <div style={{display: "none"}}>
                <SettlementReport ref={refSettlement}></SettlementReport>
            </div>
          
            </div>
        </ >
  );
}

export default BidBoard;