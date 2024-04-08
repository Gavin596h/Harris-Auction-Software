import NewBid from '../components/NewBid';


const Home = () => {
    return    (
        <div className="p-4 sm:ml-64 font-fira">
            <h2>Upcoming</h2>
            <label>Sort:</label>
            <select className="bg-gray-200 p-2 m-2">
                <option>Date - Oldest First</option>
                <option>Date - Newest First</option>
                <option>A-Z</option>
            </select>
            <br></br>
            <ul className="p-0">
                <li className="bg-gray-200 p-4 w-full">
                    <div className="w-6/12">
                        <h3>Business Building</h3>
                        <p>Tracts: 2</p>
                        <p>Date: April 1st, 2024</p>
                    </div>
                    <div className="w-6/12">
                        <button className="m-2 p-3 bg-red-700 text-white">Remove</button>
                        <button className="m-2 p-3 bg-red-700 text-white">Edit</button>
                        <button className="m-2 p-3 bg-red-700 text-white">Start</button>
                    </div>
                </li>
            </ul>
            <hr></hr>
            <h2>Past Auctions</h2>
            <label>Sort:</label>
            <select className="bg-gray-200 p-2 m-2">
                <option>Date - Oldest First</option>
                <option>Date - Newest First</option>
                <option>A-Z</option>
            </select>
            <label>Filter:</label>
            <select className="bg-gray-200 p-2 m-2">
                <option>Date - Oldest First</option>
                <option>Date - Newest First</option>
                <option>A-Z</option>
            </select>
            <br></br>
            <ul className="p-0">
                <li className="bg-gray-200 p-4 w-full">
                    <div className="w-6/12">
                        <h3>Business Building</h3>
                        <p>Tracts: 2</p>
                        <p>Date: April 1st, 2024</p>
                    </div>
                    <div className="w-6/12">
                        <button className="m-2 p-3 bg-red-700 text-white">Remove</button>
                        <button className="m-2 p-3 bg-red-700 text-white">Edit</button>
                        <button className="m-2 p-3 bg-red-700 text-white">Start</button>
                    </div>
                </li>
            </ul>
            <ul className="p-0">
                <li className="bg-gray-200 p-4 w-full">
                    <div className="w-6/12">
                        <h3>Business Building</h3>
                        <p>Tracts: 2</p>
                        <p>Date: April 1st, 2024</p>
                    </div>
                    <div className="w-6/12">
                        <button className="m-2 p-3 bg-red-700 text-white">Remove</button>
                        <button className="m-2 p-3 bg-red-700 text-white">Edit</button>
                        <button className="m-2 p-3 bg-red-700 text-white">Start</button>
                    </div>
                </li>
            </ul>
    </div>

    )
}

export default Home 