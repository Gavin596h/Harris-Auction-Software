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
import { Button, Modal, ModalBody } from "flowbite-react";


function BidBoard({ bids, fetchBids }) {
    const [totalBids, setTotalBids] = useState('');
    const [totalPerAcre, setTotalPerAcre] = useState('');
    const [currentAuctionNumber, setCurrentAuctionNumber] = useState(localStorage.getItem('currentAuctionNumber'));
    const [currentAuction, setCurrentAuction] = useState({
        name: '',
        tractNum: 0
    });
    const [high, setHigh] = useState([]);
    const [bidID, setID] = useState();

    const refReport = useRef();
    const refSettlement = useRef();
    const [openModal, setOpenModal] = useState(true);

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
            setHigh(bids.filter((b) => b.High === true));
            fetchAuction(auctionNumber);
        }
    }, [fetchBids]);


  return (
    <>
    {/* <Modal show={openModal} onClose={() => setOpenModal(false)}>
                            <Modal.Header>Settlment Report</Modal.Header>
                            <Modal.Body>
                            <div>
                            <table className="text-sm text-white right-0">
                                <thead className="w-full text-xsuppercase bg-gray-900 text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">Bidder Number</th>
                                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">Bid Amount</th>
                                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">Per Acre</th>
                                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">High</th>
                                        <th scope="col" className="px-6 py-3">Tract</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {high.map((bid, index) => (
                                        <tr key={index} className={bid.High ? 'bg-gray-600' : 'bg-black'}>
                                            <td className="border-gray-400 border-r-2 px-6">{bid.Bidder}</td>
                                            <td className="border-gray-400 border-r-2 px-6 py-4">{bid.BidAmount.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0})}</td>
                                            <td className="border-gray-400 border-r-2 px-6 py-4">{bid.PerAcre ? bid.PerAcre.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2}) : "$0"}</td>                            
                                            <td className="border-gray-400 border-r-2 px-6 py-4">{bid.High ? 'Yes' : 'No'}</td>
                                            <td className="border-gray-400 px-6 py-4">
                                                {bid.Tract.map(t => <span key={t} className={bid.High ? 'bg-white text-black p-2 m-1' : 'bg-gray-700 p-2 m-1'}>{t}</span>)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            </Modal.Body>
                            <Modal.Footer>                            
                            <button className='p-2 bg-red-700 text-white m-2' onClick={() => setOpenModal(false)}>
                                Settlement
                             </button>          
                            </Modal.Footer>
                        </Modal> */}
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

                    <details className="dropdown">
                        <summary className="p-2 bg-red-700 text-white m-2">Settlement Report</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-gray-100">
                        {high.map((bid, index) => (
                            <li>
                            <tr key={index} className='w-full'>
                                <td className="border-gray-400 border-r-2 px-6">
                                    <ReactToPrint
                                        content={() => refSettlement.current}
                                        trigger={() => (
                                            <button className='p-2 bg-red-700 text-white m-2' onClick={() => setID("testing")}>
                                                    Print
                                            </button>
                                        )}
                                        />  
                                    </td>
                                <td className="border-gray-400 border-r-2 px-6">{bid.Bidder}</td>
                                <td className="border-gray-400 border-r-2 px-6 py-4">{bid.BidAmount.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0})}</td>
                                <td className="border-gray-400 border-r-2 px-6 py-4">{bid.ToLead ? bid.ToLead.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0}) : "$0"}</td>
                                <td className="border-gray-400 border-r-2 px-6 py-4">{bid.PerAcre ? bid.PerAcre.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2}) : "$0"}</td>                            
                                <td className="border-gray-400 px-6 py-4">
                                    {bid.Tract.map(t => <span key={t} className={bid.High ? 'bg-white text-black p-2 m-1' : 'bg-gray-700 p-2 m-1'}>{t}</span>)}
                                </td>
                            </tr>
                            </li>
                        ))}
                        </ul>
                    </details>

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
                <SettlementReport ref={refSettlement} props={bidID}></SettlementReport>
            </div>
          
            </div>
            
        </ >
  );
}

export default BidBoard;