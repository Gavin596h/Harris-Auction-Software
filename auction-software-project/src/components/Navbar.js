import NewAuction from '../pages/NewAuction';
import Home from '../pages/Home';
import { NavLink } from 'react-router-dom';
import {RiAuctionFill} from 'react-icons/ri'
import { TbReportAnalytics } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";

const Navbar = ({show}) => {
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
        <aside className='fixed top-0 left-0 z-40 w-64 h-screen'>
            <div className='h-full overflow-y-auto py-5 px-3 bg-gray-50 dark:bg-red-700'>         
            <ul className='space-y-2'>
                    <li>
                        <NavLink to="/" onClick={() => show(!show)} className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'><TbReportAnalytics />
                            <span class="ml-3">Dashboard</span> 
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" onClick={() => show(!show)} className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'><TbReportAnalytics /> 
                            <span class="ml-3">History</span> 
                        </NavLink>
                    </li>
                    <li>
                        <a href="/#" className=' no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'>
                        <span class="ml-3">Reports</span>
                        </a>
                    </li>
                    <li>
                        <a href="/#" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'>
                        <span class="ml-3">Calandar</span>
                        </a>
                    </li>
                    </ul>
                    <ul class="pt-5 mt-5 space-y-2 border-t dark:border-white-500">
                        <li>
                            <a href="/#" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'>
                            <span class="ml-3">Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="/#" className='no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-red-600 group w-200'>
                            <span class="ml-3">Help</span>
                            </a>
                        </li>
                    </ul>
            </div>
        </aside>
        </div>

    )
}

export default Navbar