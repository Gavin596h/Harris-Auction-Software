<<<<<<< Updated upstream
function NewAuction() {
    const handleSubmit = async (event) => {
        console.log(event.target); // Debugging line
        event.preventDefault();
        const formData = new FormData(event.target);
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
=======
import { useState,useEffect,useRef} from "react";
import {useNavigate} from 'react-router';

function NewAuction() {
  //Handles submission for new auctions
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

  //Fetches past auctions
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
>>>>>>> Stashed changes
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

<<<<<<< Updated upstream
=======
      fetchPastAuctions();
    }, []);

    //References for HTML
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
    
    const navigate = useNavigate();

    //Stores past auctions to be put back into input fields
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

  //Form outline and page navigation when auction is created
>>>>>>> Stashed changes
    return <>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event);
          navigate("/successfully-submitted");
        }}>
            <fieldset>
                <legend>Description</legend><br/>
                <label for="AuctionName">Auction Name</label>
                <input type="text" id="AuctionName" name="AuctionName"></input>
                <label for="AuctionNumber">Auction #</label>
                <input type="number" id="AuctionNumber" name="AuctionNumber"></input><br/>
                <label for="ActionDate">Auction Date</label>
                <input type="date" id="AuctionDate" name="AuctionDate"></input>
                <label for="TractQuantity">Tract Quantity</label>
                <input type="number" id="TractQuantity" name="TractQuantity"></input><br/>
                <label for="UnitOfMeasurement">Unit of Measure (U/M)</label>
                <select id="UnitOfMeasurement" name="UnitOfMeasurement" size="2">
                    <option value="Acre">Acre</option>
                    <option value="placeholder">placeholder</option>
                </select>
                <label for="NumOfDecPlaces">No. of U/M Decimal Places</label>
                <input type="number" id="NumOfDecPlaces" name="NumOfDecPlaces"></input><br/>
                <label for="CollectiveUnitOfMeasurement">Collective U/M</label>
                <select id="CollectiveUnitOfMeasurement" name="CollectiveUnitOfMeasurement" size="2">
                    <option value="Tract">Tract</option>
                    <option value="placeholder">placeholder</option>
                </select>
                <input type="submit" id="TractSetup" name="TractSetup" value="Tract Setup"></input><br/>
            </fieldset><br/>
            <fieldset>
                <legend>Settings</legend>
                <label for="BidMethod">Bid Method</label>
                <select id="BidMethod" name="BidMethod" size="2">
                    <option value="InTotal">In Total</option>
                    <option value="placeholder">placeholder</option>
                </select>
                <input type="checkbox" id="PrintOrNot" name="PrintOrNot"></input>
                <label for="PrintOrNot">Print the bid board after each bid</label><br/>
                <label for="NumberOfLeaderBoards">No. of leader boards to track</label>
                <input type="number" id="NumberOfLeaderBoards" name="NumberOfLeaderBoards"></input>
                <input type="checkbox" id="WarnOnCombination" name="WarnOnCombination"></input>
                <label for="WarnOnCombination">Warn on new combination</label><br/>
                <label for="HighColumn">"High" column description</label>
                <select id="HighColumn" name="HighColumn" size="2">
                    <option value="High">High</option>
                    <option value="placeholder">placeholder</option>
                </select>
                <input type="checkbox" id="BidQueryCombination" name="BidQueryCombination"></input>
                <label for="BidQueryCombination">Bid query combination</label><br/>
                <input type="button" id="SetAsDefault" name="SetAsDefault" value="Set as default"></input><br/>
            </fieldset><br/>
            <fieldset>
                <legend>Terms</legend>
                <input type="checkbox" id="BuyersPrem" name="BuyersPrem"></input>
                <label for="BuyersPrem">Buyer's premium</label>
                <input type="number" id="BuyersPremPercent" name="BuyersPremPercent"></input>
                <label for="BuyersPremPercent">%</label><br/>
                <input type="radio" id="None" name="group1" value="None" />
                <label for="None">None</label><br/>
                <label for="Percent">Deposit: </label>
                <input type="radio" id="Percent" name="group1" value="Percent" />
                <label for="Percent">Percent</label>
                <input type="number" id="PercentOrAmount" name="PercentOrAmount"></input><br/>
                <input type="radio" id="Amount" name="group1" value="Amount" />
                <label for="Amount">Amount</label><br/>
            </fieldset><br/>
            <fieldset>
                <legend>System</legend>
                <input type="button" id="CreateDuplicate" name="CreateDuplicate" value="Create Duplicate"></input>
                <input type="button" id="EventLog" name="EventLog" value="Event Log"></input><br/>
                <input type="button" id="ResetToDefaults" name="ResetToDefaults" value="Reset To Defaults"></input>
                <input type="button" id="ScreenTitle" name="ScreenTitle" value="Screen Title"></input><br/>
            </fieldset><br/>
            <fieldset>
                <legend>Find Auction</legend>
                <select id="PastAuctions" name="PastAuctions" size="2">
                    <option value="placeholder1">placeholder</option>
                    <option value="placeholder2">placeholder</option>
                </select>
                <input type="button" id="BidBoards" name="BidBoards" value="Bid Boards"></input>
                <input type="button" id="ReportsOrFile" name="ReportsOrFile" value="Reports / File"></input><br/>
                <label>Sort By: </label>
                <input type="radio" id="AuctionNameSearch" name="group2" value="Auction Name" />
                <label for="AuctionNameSearch">Auction Name</label>
                <input type="radio" id="AuctionDateSearch" name="group2" value="Auction Date" />
                <label for="AuctionDateSearch">Auction Date</label>
            </fieldset>
        </form>
    </>
}

export default NewAuction