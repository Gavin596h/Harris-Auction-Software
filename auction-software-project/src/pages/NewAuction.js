import '../style/NewAuction.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import { useState,useEffect,useRef } from "react";

function NewAuction() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Handle boolean values explicitly
    formData.set('PrintOrNot', formData.has('PrintOrNot'));
    formData.set('WarnOnCombination', formData.has('WarnOnCombination'));
    formData.set('BidQueryCombination', formData.has('BidQueryCombination'));
    formData.set('BuyersPrem', formData.has('BuyersPrem'));

    // Handle DepositType based on radio button selection
    const depositType = formData.get('group1'); // 'None', 'Percent', or 'Amount'
    formData.delete('group1'); // Remove it from formData since 'group1' is not part of the schema
    if (depositType !== 'None') {
      formData.set('DepositType', depositType);
    } else {
      formData.set('DepositType', '');
      formData.set('PercentOrAmount', 0); // Reset this value if 'None' is selected
    }

  const formProps = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:3001/AuctionCRUD', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProps),
      });
      if (response.ok) {
        console.log('Auction submitted successfully');
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [pastAuctions, setPastAuctions] = useState([]);

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

    const auctionNameRef = useRef();
    const auctionNumberRef = useRef();
    const auctionDateRef = useRef();
    const tractQuantityRef = useRef();
    const unitOfMeasurementRef = useRef();
    const numOfDecPlacesRef = useRef();
    const collectiveUnitOfMeasurementRef = useRef();
    const bidMethodRef = useRef();
    const numberOfLeaderBoardsRef = useRef();
    const highColumnRef = useRef();
    const printOrNotRef = useRef();
    const warnOnCombinationRef = useRef();
    const bidQueryCombinationRef = useRef();
    const buyersPremRef = useRef();
    const buyersPremPercentRef = useRef();
    const depositTypeRef = useRef();
    const percentOrAmountRef = useRef();
    const depositTypeNoneRef = useRef();
    const depositTypePercentRef = useRef();
    const depositTypeAmountRef = useRef();

    


    const handlePastAuctionSelect = async (event) => {
      const auctionId = event.target.value;
      const selectedAuction = pastAuctions.find(auction => auction._id === auctionId);
      if (selectedAuction) {
          auctionNameRef.current.value = selectedAuction.AuctionName || '';
          auctionNumberRef.current.value = selectedAuction.AuctionNumber || '';
          auctionDateRef.current.value = selectedAuction.AuctionDate ? selectedAuction.AuctionDate.split('T')[0] : ''; // Assuming AuctionDate is in ISO format
          tractQuantityRef.current.value = selectedAuction.TractQuantity || '';
          unitOfMeasurementRef.current.value = selectedAuction.UnitOfMeasurement || '';
          numOfDecPlacesRef.current.value = selectedAuction.NumOfDecPlaces || '';
          collectiveUnitOfMeasurementRef.current.value = selectedAuction.CollectiveUnitOfMeasurement || '';
          bidMethodRef.current.value = selectedAuction.BidMethod || '';
          numberOfLeaderBoardsRef.current.value = selectedAuction.NumberOfLeaderBoards || '';
          highColumnRef.current.value = selectedAuction.HighColumn || '';
          printOrNotRef.current.checked = selectedAuction.PrintOrNot || false;
          warnOnCombinationRef.current.checked = selectedAuction.WarnOnCombination || false;
          bidQueryCombinationRef.current.checked = selectedAuction.BidQueryCombination || false;
          buyersPremRef.current.checked = selectedAuction.BuyersPrem || false;
          buyersPremPercentRef.current.value = selectedAuction.BuyersPremPercent || '';

          depositTypeNoneRef.current.checked = false;
          depositTypePercentRef.current.checked = false;
          depositTypeAmountRef.current.checked = false;
  
          // For DepositType, you might need a more complex handling depending on how it's structured
          // This is a simple example assuming you have refs for radio buttons
          if (selectedAuction.DepositType === 'None') {
              depositTypeNoneRef.current.checked = true;
          } else if (selectedAuction.DepositType === 'Percent') {
              depositTypePercentRef.current.checked = true;
          } else if (selectedAuction.DepositType === 'Amount') {
              depositTypeAmountRef.current.checked = true;
          }
          percentOrAmountRef.current.value = selectedAuction.PercentOrAmount || '';
      }
  };

 
  
  const [tractAcres, setTractAcres] = useState([]);
  const [popupMenuVisible, setPopupMenuVisible] = useState(false);

  const handleTractQuantityChange = () => {
    const quantity = parseInt(tractQuantityRef.current.value);
    if (!isNaN(quantity) && quantity > 0) {
      setTractAcres(new Array(quantity).fill(0));
      setPopupMenuVisible(true); 
    } else {
      alert("Please enter a valid number of tracts.");
    }
  };

   
   const handleClosePopup = () => {
    setPopupMenuVisible(false);
    
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

  const calculateTotalAcres = () => {
    return tractAcres.reduce((total, acres) => total + (acres || 0), 0);
  };


    return <>

 <body>
    <div class="font-fira w-full flex justify-center mt-10">
        <form onSubmit={handleSubmit}>
{/* Description */}
          <legend>Description</legend>

          <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide mb-2" for="AuctionName">Auction Name</label>
              <input type="text" id="AuctionName" name="AuctionName" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded"  ref={auctionNameRef}></input>
            </div>

            <div class="w-2/12 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide mb-2" for="AuctionDate">Date</label>
              <input type="date" id="AuctionDate" name="AuctionDate" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded" ref={auctionDateRef}></input>
            </div>
            
            <div class="w-2/12 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide mb-2" for="AuctionNumber">Auction #</label>
              <input type="number" id="AuctionNumber" name="AuctionNumber" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded" ref={auctionNumberRef}></input>
            </div>
            
            <div class="flex w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <div class="w-3/6">
                <button class="block tracking-wide mb-2"  for="TractQuantity">Tract</button>
                <input type="number" id="TractQuantity" name="TractQuantity" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded" onChange={handleTractQuantityChange} min="1" ref={tractQuantityRef} ></input>
              </div>

              {popupMenuVisible && (
              <div className="popup-menu bg-gray-200 px-4 py-2">
                <h3>Enter Acres for Each Tract</h3>
                {tractAcres.map((acres, index) => (
                  <div key={index}>
                    <label>
                      Tract {index + 1}: 
                      <input 
                        type="number" 
                        value={acres || ''} 
                        onChange={(event) => handleAcresChange(index, event)}
                        min="1" 
                        step="any" 
                      />
                    </label>
                  </div>
                ))}
                <button onClick={handleClosePopup} disabled={tractAcres.some(acres => acres <= 0 || acres === '')}>Done</button>
              </div>
            )}
            
              <div class="w-3/6 ml-5">
                  <label for="UnitOfMeasurement" class="block tracking-wide mb-2  ml-5" >(U/M)</label>
                      <select id="UnitOfMeasurement" name="UnitOfMeasurement" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded"  ref={unitOfMeasurementRef}>
                          <option value="Acre">Acre</option>
                          <option value="placeholder">placeholder</option>
                      </select>
                  </div>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-2/12 px-3 mb-6 md:mb-0">
                <label class="block tracking-wide mb-2" for="NumOfDecPlaces">U/M Decimal Places</label>
                <input type="number" id="NumOfDecPlaces" name="NumOfDecPlaces"  class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded"  ref={numOfDecPlacesRef}></input>
            </div>
              <div class="w-2/12">
                <label for="CollectiveUnitOfMeasurement" class="block tracking-wide mb-2 ml-5" >Collective U/M</label>
                    <select id="CollectiveUnitOfMeasurement" name="CollectiveUnitOfMeasurement" class="rounded block w-full py-2 px-4 mb-3 leading-tight ml-5 bg-gray-200" ref={collectiveUnitOfMeasurementRef}>
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
                  <select id="BidMethod" name="BidMethod" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded"  ref={bidMethodRef }>
                      <option value="InTotal">In Total</option>
                      <option value="placeholder">placeholder</option>
                  </select>
            </div>

            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label for="HighColumn" class="block tracking-wide mb-2">"High" column description</label>
                  <select id="HighColumn" name="HighColumn" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded"  ref={highColumnRef}>
                    <option value="High">High</option>
                    <option value="placeholder">placeholder</option>
                  </select>
            </div>
            </div>
            <div class="flex items-center mb-4">
                <input type="checkbox" id="WarnOnCombination" name="WarnOnCombination" class=" w-4 h-4 dark:bg-gray-700 dark:border-gray-600"  ref={warnOnCombinationRef}></input>
                <label class="ms-2"  for="WarnOnCombination">Warn on new combination</label>
            </div>
            <div class="flex items-center mb-4">
                <input type="checkbox" id="BidQueryCombination" name="BidQueryCombination" class=" w-4 h-4 dark:bg-gray-700 dark:border-gray-600" ref={bidQueryCombinationRef}></input>
                <label  class="ms-2" for="BidQueryCombination">Bid query combination</label>
            </div>

{/*Forgot name of id and name */}   
            <div class="flex items-center mb-4">
                <input type="checkbox" id="BidQueryCombination" name="BidQueryCombination" class=" w-4 h-4 dark:bg-gray-700 dark:border-gray-600"  ref={printOrNotRef}></input>
                <label  class="ms-2" for="BidQueryCombination">Print the bid board after each bid</label>
            </div>
              <div class="w-full md:w-1/4 md:mb-0">
                <button type="submit" id="SetAsDefault" name="SetAsDefault" class="bg-red-500 py-2 px-4 rounded text-white" >Set As Default</button>
              </div>
{/* End of Settings */}

<hr/>
{/* Terms */}
        <legend>Terms</legend>
        <div class="flex flex-wrap -mx-3">
            <div class=" md:w-1/6 px-3 mb-6 md:mb-0">
                <label class="block tracking-wide mb-2" for="BuyersPrem">Buyer's Premium</label>
                <input type="number" id="BuyersPrem" name="BuyersPrem" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded" ref={buyersPremRef}></input>
            </div>
            <div class="flex w-1/6 px-3 mb-6 md:mb-0">
              <div class="w-3/6">
                <label class="block tracking-wide mb-2"  for="BuyersPremPercent">Deposit</label>
                <input type="number" id="BuyersPremPercent" name="BuyersPremPercent" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded" ref={buyersPremPercentRef} ></input>
              </div>
              <div class="w-3/6 ml-5">
                  <label for="PercentOrAmount" class="block tracking-wide mb-2  ml-5" >Units</label>
                      <select id="PercentOrAmount" name="PercentOrAmount" class="block py-2 px-4 mb-3 leading-tight bg-gray-200 rounded" ref={percentOrAmountRef}>
                          <option value="Percent" ref={depositTypeAmountRef}>Amount</option>
                          <option value="Percent" ref={depositTypePercentRef}>Percent</option>
                          <option value="None" ref={depositTypeNoneRef}>None</option>

                      </select>
                  </div>
            </div>
          </div>
          <hr/>

{/* Settings */}
          <legend>Settings</legend>
          <div class="flex flex-wrap mb-6 md:mb-0 text-white">
            <input type="button" id="CreateDuplicate" name="CreateDuplicate" value="Create Duplicate" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-red-500 rounded dark:hover:bg-red-600 cursor-pointer"></input>
            <input type="button" id="EventLog" name="EventLog" value="Event Log" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-red-500 rounded dark:hover:bg-red-600 cursor-pointer"></input>
            <input type="button" id="ResetToDefaults" name="ResetToDefaults" value="Reset To Defaults" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-red-500 rounded dark:hover:bg-red-600 cursor-pointer"></input>
            <input type="button" id="ScreenTitle" name="ScreenTitle" value="Screen Title" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-red-500 rounded dark:hover:bg-red-600 cursor-pointer"></input><br/>
          </div>
          <hr/>

{/* Find Auction */}

                <legend>Find Auction</legend>
                <div class="flex flex-wrap mb-6 md:mb-0">
                    <select id="PastAuctions" name="PastAuctions" class="block w-full py-2 px-4 mb-3 leading-tight bg-gray-200 rounded">
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
                <input type="button" id="Create" name="Create" value="Start Auction" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-gray-500 rounded dark:hover:bg-red-600 cursor-pointer text-white"></input>
                <input type="button" id="Save" name="Save" value="Save" class="mr-5 block py-2 px-4 mb-3 leading-tight bg-gray-500 rounded dark:hover:bg-red-600 cursor-pointer"></input>
              </div>        
            </form>
        </div>
    </body>
    </>
}

export default NewAuction