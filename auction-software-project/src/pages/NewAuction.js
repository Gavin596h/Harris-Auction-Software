import '../style/NewAuction.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function NewAuction() {

  const [formData, setFormData] = useState({
    AuctionName: '',
    AuctionDate: '',
    AuctionNumber: 0,
    TractQuantity: '',
    TractAcres: [],
    UnitOfMeasurement: 'Acre', // Default value
    NumOfDecPlaces: '',
    CollectiveUnitOfMeasurement: 'Tract', // Default value
    BidMethod: 'InTotal', // Default value
    HighColumn: 'High', // Defaul value
    PrintOrNot: false,
    WarnOnCombination: false,
    BidQueryCombination: false,
    BuyersPrem: false,
    BuyersPremPercent: 0,
    DepositType: 'None', // Default value
    PercentOrAmount: 0, // Default value
  });

  const handleResetDefaults = () => {
    setFormData({
      AuctionName: '',
      AuctionDate: '',
      AuctionNumber: 0,
      TractQuantity: '',
      TractAcres: [],
      UnitOfMeasurement: 'Acre',
      NumOfDecPlaces: '',
      CollectiveUnitOfMeasurement: 'Tract',
      BidMethod: 'InTotal',
      HighColumn: 'High',
      PrintOrNot: false,
      WarnOnCombination: false,
      BidQueryCombination: false,
      BuyersPrem: false,
      BuyersPremPercent: 0,
      DepositType: 'None',
      PercentOrAmount: 0,
    });

    setTractAcres([]);
    setPopupMenuVisible(false);
  };

  const [pastAuctions, setPastAuctions] = useState([]);
  const [tractAcres, setTractAcres] = useState([]);
  const [popupMenuVisible, setPopupMenuVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPastAuctions = async () => {
      try {
        const response = await fetch('http://localhost:3001/pastAuctions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const auctions = await response.json();
        setPastAuctions(auctions);
      } catch (error) {
        console.error('Failed to fetch past auctions:', error);
      }
    };

    fetchPastAuctions();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if(name === "TractQuantity") {
      handleTractQuantityChange(value);
    }
  };

  const handleTractQuantityChange = (value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      setTractAcres(new Array(quantity).fill(0));
      setPopupMenuVisible(true);
    } else {
      setPopupMenuVisible(false);
    }
  };

  const handleAcresChange = (index, event) => {
    const newTractAcres = [...tractAcres];
    const acresValue = parseFloat(event.target.value);
    if (!isNaN(acresValue) && acresValue >= 0) {
      newTractAcres[index] = acresValue;
      setTractAcres(newTractAcres);
    } else {
      alert("Please enter a valid number for acres.");
    }
  };
  
  const handleSubmit = async (event, action) => {
    event.preventDefault();

    const updatedFormData = {
        ...formData,
        TractAcres: tractAcres,
        AuctionNumber: formData.AuctionNumber,
        TractQuantity: parseInt(formData.TractQuantity, 10),
        BuyersPremPercent: parseFloat(formData.BuyersPremPercent),
        PercentOrAmount: parseFloat(formData.PercentOrAmount),
    };

    try {
        const response = await fetch('http://localhost:3001/AuctionCRUD', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFormData),
        });

        if (!response.ok) throw new Error('Submission failed');

        const responseData = await response.json();
        console.log('Auction submitted successfully', responseData);

        localStorage.setItem('currentAuctionNumber', updatedFormData.AuctionNumber.toString());

        handleResetDefaults();

        toast.success('The auction has been saved. Go to the home page for a list of auctions and to start one.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to save the auction. Please try again.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};

    const handlePastAuctionSelect = async (event) => {
      const auctionId = event.target.value;
      try {
        const response = await fetch(`http://localhost:3001/getAuction/${auctionId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const selectedAuction = await response.json();
        setFormData({
          ...formData,
          AuctionName: selectedAuction.AuctionName || '',
          AuctionDate: selectedAuction.AuctionDate ? selectedAuction.AuctionDate.split('T')[0] : '',
          AuctionNumber: selectedAuction.AuctionNumber || 0, // Ensure this is a string for the input
          TractQuantity: selectedAuction.TractQuantity.toString() || '', // Convert to string if necessary
          UnitOfMeasurement: selectedAuction.UnitOfMeasurement || 'Acre',
          NumOfDecPlaces: selectedAuction.NumOfDecPlaces.toString() || '', // Convert to string
          CollectiveUnitOfMeasurement: selectedAuction.CollectiveUnitOfMeasurement || 'Tract',
          BidMethod: selectedAuction.BidMethod || 'InTotal',
          HighColumn: selectedAuction.HighColumn || 'High',
          PrintOrNot: !!selectedAuction.PrintOrNot,
          WarnOnCombination: !!selectedAuction.WarnOnCombination,
          BidQueryCombination: !!selectedAuction.BidQueryCombination,
          BuyersPrem: !!selectedAuction.BuyersPrem,
          BuyersPremPercent: selectedAuction.BuyersPremPercent || 0,
          DepositType: selectedAuction.DepositType || '',
          PercentOrAmount: selectedAuction.PercentOrAmount || 0, // Ensure this is correctly handled
        });
      } catch (error) {
        console.error('Failed to fetch auction details:', error);
      }
    };

    return <div className="NewAuction">
<ToastContainer />
 <body>
    <div class="font-fira w-full flex justify-center mt-10">
        <form>
{/* Description */}
          <legend>Description</legend>

          <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide mb-2" for="AuctionName">Auction Name</label>
              <input type="text" id="AuctionName" name="AuctionName" value={formData.AuctionName} onChange={handleChange} class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded"></input>
            </div>

            <div class="w-2/12 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide mb-2" for="AuctionDate">Date</label>
              <input type="date" id="AuctionDate" name="AuctionDate" value={formData.AuctionDate} onChange={handleChange} class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded"></input>
            </div>
            
            <div class="w-2/12 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide mb-2" for="AuctionNumber">Auction #</label>
              <input type="number" id="AuctionNumber" name="AuctionNumber" value={formData.AuctionNumber} onChange={handleChange} class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded"></input>
            </div>
            
            <div class="flex w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <div class="w-3/6">
                <label class="block tracking-wide mb-2"  for="TractQuantity">Tract</label>
                <input type="number" id="TractQuantity" name="TractQuantity" value={formData.TractQuantity} onChange={handleChange} class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded"></input>
              </div>

              <div>
{/* Popup for entering tract acres, conditionally rendered */}
                {popupMenuVisible && (
                  <div className="absolute bg-gray-200 border border-gray-300 rounded p-4 mt-2 z-10">
                    <h3>Enter Acres for Each Tract</h3>
                    {tractAcres.map((acre, index) => (
                      <div class="y-4"key={index}>
                        <br></br>
                        <label>
                          Tract {index + 1}: 
                          <input 
                            type="number" 
                            value={acre || ''} 
                            onChange={(e) => handleAcresChange(index, e)}
                            min="0"
                          />
                        </label>
                      </div>
                    ))}
                    <button onClick={() => setPopupMenuVisible(false)} disabled={tractAcres.some(acres => acres <= 0)}>Done</button>
                  </div>
                )}
              </div>

              <div class="w-3/6 ml-5">
                  <label for="UnitOfMeasurement" class="block tracking-wide mb-2  ml-5" >(U/M)</label>
                      <select id="UnitOfMeasurement" name="UnitOfMeasurement" value={formData.UnitOfMeasurement} onChange={handleChange} class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded">
                          <option value="Acre">Acre</option>
                          <option value="placeholder">placeholder</option>
                      </select>
                  </div>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-2/12 px-3 mb-6 md:mb-0">
                <label class="block tracking-wide mb-2" for="NumOfDecPlaces">U/M Decimal Places</label>
                <input type="number" id="NumOfDecPlaces" name="NumOfDecPlaces" value={formData.NumOfDecPlaces} onChange={handleChange} class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded"></input>
            </div>
              <div class="w-2/12">
                <label for="CollectiveUnitOfMeasurement" class="block tracking-wide mb-2 ml-5" >Collective U/M</label>
                    <select id="CollectiveUnitOfMeasurement" name="CollectiveUnitOfMeasurement" value={formData.CollectiveUnitOfMeasurement} onChange={handleChange} class="rounded block w-full py-2 px-4 mb-3 leading-tight ml-5 bg-gray-200">
                      <option value="Tract">Tract</option>
                      <option value="placeholder">placeholder</option>
                    </select>
                </div>
          </div>
              <div class="w-full md:w-1/4 md:mb-0">
                <button type="submit" id="TractSetup" name="TractSetup" class="bg-red-500 py-2 px-4 rounded text-white" >Tract Setup</button>
              </div>
{/* End of Description */}
<hr/>
{/*Settings */}
          <legend>Settings</legend>
          <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label for="BidMethod"  class="block tracking-wide mb-2 ">Bid Method</label>
                  <select id="BidMethod" name="BidMethod" value={formData.BidMethod} onChange={handleChange} class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded">
                      <option value="InTotal">In Total</option>
                      <option value="placeholder">placeholder</option>
                  </select>
            </div>

            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label for="HighColumn" class="block tracking-wide mb-2">"High" column description</label>
                  <select id="HighColumn" name="HighColumn" value={formData.HighColumn} onChange={handleChange} class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded">
                    <option value="High">High</option>
                    <option value="placeholder">placeholder</option>
                  </select>
            </div>
            </div>
            <div class="flex items-center mb-4">
                <input type="checkbox" id="WarnOnCombination" name="WarnOnCombination" checked={formData.WarnOnCombination} onChange={handleChange} class=" w-4 h-4 dark:bg-gray-700 dark:border-gray-600"></input>
                <label class="ms-2"  for="WarnOnCombination">Warn on new combination</label>
            </div>
            <div class="flex items-center mb-4">
                <input type="checkbox" id="BidQueryCombination" name="BidQueryCombination" checked={formData.BidQueryCombination} onChange={handleChange} class=" w-4 h-4 dark:bg-gray-700 dark:border-gray-600"></input>
                <label  class="ms-2" for="BidQueryCombination">Bid query combination</label>
            </div>

{/*Forgot name of id and name */}   
            <div class="flex items-center mb-4">
                <input type="checkbox" id="PrintOrNot" name="PrintOrNot" checked={formData.PrintOrNot} onChange={handleChange} class=" w-4 h-4 dark:bg-gray-700 dark:border-gray-600"></input>
                <label  class="ms-2" for="PrintOrNot">Print the bid board after each bid</label>
            </div>
              <div class="w-full md:w-1/4 md:mb-0">
                <button type="submit" id="SetAsDefault" name="SetAsDefault" class="bg-red-500 py-2 px-4 rounded text-white" >Set As Default</button>
              </div>
{/* End of Settings */}

<hr/>
{/* Terms */}
        <legend>Terms</legend>
        <div class="flex flex-wrap -mx-3">
            <div class="w-1/6 mb-6 md:mb-0">
                <input type="checkbox" id="BuyersPrem" name="BuyersPrem" checked={formData.BuyersPrem} onChange={handleChange} class=" w-4 h-4 dark:bg-gray-700 dark:border-gray-600"></input>
                <label class="ms-2" for="BuyersPrem">Buyer's Premium</label>
            </div>
            <div class="w-3/6 mb-6 md:mb-0">
              <div class="w-3/6">
                <label class="block tracking-wide mb-2"  for="BuyersPremPercent">B.P. Percent</label>
                <input type="number" id="BuyersPremPercent" name="BuyersPremPercent" value={formData.BuyersPremPercent} onChange={handleChange} class="block py-2 px-4 mb-3 bg-gray-200 rounded"></input>
              </div>
              <div class="w-3/6">
                  <label for="DepositType" class="block tracking-wide mb-2" >Deposit Type</label>
                      <select id="DepositType" name="DepositType" value={formData.DepositType} onChange={handleChange} class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded">
                          <option value="Amount" >Amount</option>
                          <option value="Percent" >Percent</option>
                          <option value="None" >None</option>

                      </select>
                </div>
              </div>
            <div>
                <label class="block tracking-wide mb-2"  for="PercentOrAmount">Deposit Percent Or Amount</label>
                <input type="number" id="PercentOrAmount" name="PercentOrAmount" value={formData.PercentOrAmount} onChange={handleChange} class="block py-2 px-4 mb-3 bg-gray-200 rounded"></input>
            </div>
          </div>
          <hr/>

{/* Settings */}
          <legend>Settings</legend>
          <div class="flex flex-wrap mb-6 md:mb-0 text-white">
            <input type="button" id="CreateDuplicate" name="CreateDuplicate" value="Create Duplicate" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-red-500 rounded dark:hover:bg-red-600 cursor-pointer"></input>
            <input type="button" id="EventLog" name="EventLog" value="Event Log" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-red-500 rounded dark:hover:bg-red-600 cursor-pointer"></input>
            <input type="button" id="ResetToDefaults" name="ResetToDefaults" value="Reset To Defaults" onClick={handleResetDefaults} class="mr-5 block py-2 px-4 mb-3 leading-tight bg-red-500 rounded dark:hover:bg-red-600 cursor-pointer"></input>
            <input type="button" id="ScreenTitle" name="ScreenTitle" value="Screen Title" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-red-500 rounded dark:hover:bg-red-600 cursor-pointer"></input><br/>
          </div>
          <hr/>

{/* Find Auction */}

                <legend>Find Auction</legend>
                <div class="flex flex-wrap mb-6 md:mb-0">
                    <select id="PastAuctions" name="PastAuctions" onChange={handlePastAuctionSelect} class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded">
                        {pastAuctions.length > 0 ? (
                        pastAuctions.map(auction => (
                          <option key={auction._id} value={auction._id}>{auction.AuctionName}</option>
                            ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </div>

                  
              <div class="w-full md:w-1/4 mb-6 md:mb-0">
                  <label for="Sort" class="block tracking-wide mb-2">Sort By</label>
                    <select id="Sort" name="Sort" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded">
                      <option value="Date">Date</option>
                      <option value="Name">Name</option>
                    </select>
              </div>
              <div class="flex flex-wrap mb-6 md:mb-0 text-white">
                <input type="button" id="BidBoards" name="BidBoards" value="Bid Boards" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-red-500 rounded dark:hover:bg-red-600 cursor-pointer text-white"></input>
                <input type="button" id="ReportsOrFile" name="ReportsOrFile" value="Reports / File" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-red-500 rounded dark:hover:bg-red-600 cursor-pointer"></input>
              </div>
           
            <hr/>
            <div class="justify-center flex flex-wrap mb-6 md:mb-0 text-white">
                <input type="button" id="Save" name="Save" value="Save" onClick={(e) => handleSubmit(e)} class="mr-5 block py-2 px-4 mb-3 leading-tight bg-gray-500 rounded dark:hover:bg-red-600 cursor-pointer"></input>
            </div>
          </form>
        </div>
    </body>
    </div>
}

export default NewAuction