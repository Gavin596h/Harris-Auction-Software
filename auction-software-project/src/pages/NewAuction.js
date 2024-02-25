import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/NewAuction.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return <>
      <div class="w-full flex justify-center mt-10">
        <form onSubmit={handleSubmit}>
{/* Description */}
          <legend>Description</legend>

          <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide mb-2" for="AuctionName">Auction Name</label>
              <input type="text" id="AuctionName" name="AuctionName"class="block w-full py-3 px-4 mb-3 leading-tight" ></input>
            </div>

            <div class="w-2/12 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide mb-2" for="AuctionName">Date</label>
              <input type="date" id="AuctionDate" name="AuctionDate" class="block w-full py-3 px-4 mb-3 leading-tight" ></input>
            </div>
            
            <div class="w-2/12 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide mb-2" for="AuctionName">Auction #</label>
              <input type="number" id="AuctionNumber" name="AuctionNumber" class="block w-full py-3 px-4 mb-3 leading-tight" ></input>
            </div>
            
            <div class="flex w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <div class="w-3/6">
                <label class="block tracking-wide mb-2"  for="TractQuantity">Tract</label>
                <input type="number" id="TractQuantity" name="TractQuantity" class="block w-full py-3 px-4 mb-3 leading-tight" ></input>
              </div>
              <div class="w-3/6 ml-5">
                  <label for="UnitOfMeasurement" class="block tracking-wide mb-2  ml-5" >(U/M)</label>
                      <select id="UnitOfMeasurement" name="UnitOfMeasurement" class="block py-3 px-4 mb-3 leading-tight bg-gray-200 rounded">
                          <option value="Acre">Acre</option>
                          <option value="placeholder">placeholder</option>
                      </select>
                  </div>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-2/12 px-3 mb-6 md:mb-0">
                <label class="block tracking-wide mb-2" for="NumOfDecPlaces">U/M Decimal Places</label>
                <input type="number" id="NumOfDecPlaces" name="NumOfDecPlaces"  class="block w-full py-3 px-4 mb-3 leading-tight bg-gray-200" ></input>
            </div>
              <div class="w-2/12">
                <label for="CollectiveUnitOfMeasurement" class="block tracking-wide mb-2 ml-5" >Collective U/M</label>
                    <select id="CollectiveUnitOfMeasurement" name="CollectiveUnitOfMeasurement" class="rounded block w-full py-3 px-4 mb-3 leading-tight ml-5 bg-gray-200">
                      <option value="Tract">Tract</option>
                      <option value="placeholder">placeholder</option>
                    </select>
                </div>
          </div>
              <div class="w-full md:w-1/4 md:mb-0">
                <button type="submit" id="TractSetup" name="TractSetup" class="bg-red-500 py-2 px-4 rounded" >Tract Setup</button>
              </div>
{/* End of Description */}
<br/>
{/*Settings */}
          <legend>Settings</legend>
          <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label for="BidMethod"  class="block tracking-wide mb-2 ">Bid Method</label>
                  <select id="BidMethod" name="BidMethod" class="block w-full py-3 px-4 mb-3 leading-tight bg-gray-200 rounded">
                      <option value="InTotal">In Total</option>
                      <option value="placeholder">placeholder</option>
                  </select>
            </div>

            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label for="HighColumn" class="block tracking-wide mb-2">"High" column description</label>
                  <select id="HighColumn" name="HighColumn" class="block w-full py-3 px-4 mb-3 leading-tight bg-gray-200 rounded">
                    <option value="High">High</option>
                    <option value="placeholder">placeholder</option>
                  </select>
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class=""  for="WarnOnCombination">Warn on new combination</label>
                <input type="checkbox" id="WarnOnCombination" name="WarnOnCombination" class=" w-full py-3 px-4 mb-3 leading-tight" ></input>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">

              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label  class="mb-2" for="BidQueryCombination">Bid query combination</label>
                <input type="checkbox" id="BidQueryCombination" name="BidQueryCombination" class="w-full py-3 px-4 mb-3 leading-tight" ></input>
              </div>

              

              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <button type="button" id="SetAsDefault" name="SetAsDefault">Set As Default</button>
              </div>
              </div>
            </div>
{/* End of Settings */}


{/* Terms */}
        <div class="flex flex-wrap -mx-3">
        <legend>Terms</legend>

            <div class="flex w-1/2 px-3 mb-6 md:mb-0">
              <div class="w-3/6">
                <label class="block tracking-wide mb-2"  for="TractQuantity">Deposit</label>
                <input type="number" id="TractQuantity" name="TractQuantity" class="block w-full py-3 px-4 mb-3 leading-tight" ></input>
              </div>
              <div class="w-3/6 ml-5">
                  <label for="UnitOfMeasurement" class="block tracking-wide mb-2  ml-5" >Units</label>
                      <select id="UnitOfMeasurement" name="UnitOfMeasurement" class="block py-3 px-4 mb-3 leading-tight bg-gray-200 rounded">
                          <option value="Percent">Amount</option>
                          <option value="Percent">Percent</option>
                          <option value="None">None</option>

                      </select>
                  </div>
                <div class=" md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block tracking-wide mb-2" for="Buyer">Buyer's Premium</label>
                  <input type="number" id="Buyer" name="Buyer" class="block w-full py-3 px-4 mb-3 leading-tight" ></input>
                </div>
            </div>

          </div>




          <legend>Settings</legend>
          <div class="flex flex-wrap -mx-3">
            <div><input type="button" id="CreateDuplicate" name="CreateDuplicate" value="Create Duplicate" class="mr-5 block py-3 px-4 mb-3 leading-tight bg-red-500 rounded"></input></div>
            <div><input type="button" id="EventLog" name="EventLog" value="Event Log" class="mr-5 block py-3 px-4 mb-3 leading-tight bg-red-500 rounded"></input></div>
            <input type="button" id="ResetToDefaults" name="ResetToDefaults" value="Reset To Defaults" class="mr-5 block py-3 px-4 mb-3 leading-tight bg-red-500 rounded"></input>
            <input type="button" id="ScreenTitle" name="ScreenTitle" value="Screen Title" class="mr-5 block py-3 px-4 mb-3 leading-tight bg-red-500 rounded"></input><br/>
          </div>

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
        </div>
    </>
}

export default NewAuction