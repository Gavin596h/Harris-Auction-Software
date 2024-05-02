import React, { useState, useEffect } from "react"
import Moment from 'react-moment';


// Create styles
  const Report = React.forwardRef((props, ref) => {

    const [bids, setBids] = useState([]);
    const [currentAuction, setCurrentAuction] = useState({
      name: '',
      tractNum: 0,
      date: Date
    });
    const [totalBids, setTotalBids] = useState('');
    const [totalPerAcre, setTotalPerAcre] = useState('');



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
      } catch (error) {
          console.error('There was an error fetching the bids:', error);
      }
  };

  const fetchAuction = async () => {
    try {
        const auctionNumber = localStorage.getItem('currentAuctionNumber');
        const url = `http://localhost:3001/getAuctionByNumber/${auctionNumber}`; // updated to auctionCRUDs new method
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurrentAuction(({
          name: data.AuctionName,
          tractNum: data.TractAcres,
          date: data.AuctionDate
      })); 
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
    fetchBids();
    fetchAuction();
}, []);

    return(
      <div className="p-20 font-fira dark:bg-gray-800 h-screen" ref={ref}>
      <div>
          <h2 className='text-black'>{currentAuction.name}</h2>
          <Moment format="D MMM YYYY" withTitle>{currentAuction.date}</Moment>
        <br></br>
          <label htmlFor="total">Total: </label>
          <input className=" p-2 m-2" type="string" id="total" name="total" value={totalBids.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}></input>
          <label htmlFor="PerAcreTotal">Per Acre: </label>
          <input className=" p-2 m-2" type="string" id="total" name="PerAcreTotal" value={totalPerAcre.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 })}></input>
      </div>
  
      <table className="w-full text-sm text-black right-0 border-collapse">
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
              {bids.map((bid, index) => (
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
      </div>
    )
    
  })

export default Report;