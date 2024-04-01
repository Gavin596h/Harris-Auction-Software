import NewAuction from '../pages/NewAuction';
import Home from '../pages/Home';
import { NavLink } from 'react-router-dom';
import { FaRegCalendarAlt } from "react-icons/fa";
import {RiAuctionFill} from 'react-icons/ri'
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";


const Navbar = () => {
    return (
        <aside className='font-fira fixed top-0 left-0 z-40 w-64 h-screen'>
            <div className='h-full overflow-y-auto py-5 px-3 bg-red-700'>         
            <ul className="pl-0 space-y-1">
                    <li>
                        <NavLink to="/bid-board" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group'>
                            <MdOutlineDashboard />
                            <span class="ml-3">Board</span> 
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to="/new-auction" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group'><RiAuctionFill /> 
                            <span class="ml-3">New Acution</span> 
                        </NavLink>
                    </li>
                    <li>
                        <a href="/home" className=' no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'>
                        <TbReportAnalytics/>
                        <span class="ml-3">Reports</span>
                        </a>
                    </li>
                    <li>
                        <a href="/#" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'>
                        <FaRegCalendarAlt />
                        <span class="ml-3">Calandar</span>
                        </a>
                    </li>
                    </ul>
                    <hr class="w-48 h-0.5 mx-auto my-4 bg-white border-0 rounded md:my-10"/>
                    <ul className="pl-0 space-y-1">
                        <li>
                            <a href="/#" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'>
                            <IoIosSettings />
                            <span class="ml-3">Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="/#" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'>
                            <IoIosHelpCircleOutline />
                            <span class="ml-3">Help</span>
                            </a>
                        </li>
                    </ul>
                    <br>
            </br>


            <div className="bg-gray-800 p-4">
            <label className="text-white">Bid amount</label>
            <input className="w-full p-2"></input>
            <hr></hr>
            <labe className="text-white">Bid Number</labe>
            <input className="w-full p-2"></input>
            <hr></hr>
            <ul className="grid grid-cols-3 p-0 gap-3">
                <li>
                    <input id="1" type="checkbox" value="" class="hidden peer" required=""></input>
                    <label for="1" className=" w-10 h-10 hover:bg-gray-500 hover:text-white bg-gray-100 inline-flex items-center justify-between cursor-pointer peer-checked:text-white peer-checked:bg-red-600 rounded text-gray-900">
                        <div className="block text-center items-center w-full">1</div>
                    </label>
                </li>
            </ul>
            <button className="bg-red-700 text-white w-full p-2">Add Bid</button>
            </div>

                    </div>


        </aside>

    )
}

export default Navbar