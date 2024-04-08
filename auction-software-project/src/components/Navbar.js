import { NavLink } from 'react-router-dom';
import { FaRegCalendarAlt } from "react-icons/fa";
import {RiAuctionFill} from 'react-icons/ri'
import { TbReportAnalytics } from "react-icons/tb";
import { MdHome, MdOutlineDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";


const Navbar = () => {
    return (
        <aside className='font-fira fixed top-0 left-0 z-40 w-64 h-screen'>
            <div className='h-full overflow-y-auto py-5 px-3 bg-red-700'>         
            <ul className="pl-0 space-y-1">
                    <li>
                        <NavLink to="/home" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group'>
                            <MdHome />
                            <span class="ml-3">Home</span> 
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bid-board" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group'>
                            <MdOutlineDashboard />
                            <span class="ml-3">Board</span> 
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to="/new-auction" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group'><RiAuctionFill /> 
                            <span class="ml-3">New Auction</span> 
                        </NavLink>
                    </li>
                    <li>
                        <a href="/reports" className=' no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'>
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
            </div>
        </aside>
    )
}

export default Navbar