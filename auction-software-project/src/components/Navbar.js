import NewAuction from '../pages/NewAuction';
import Home from '../pages/Home';
import { NavLink } from 'react-router-dom';
import {RiAuctionFill} from 'react-icons/ri'
import { TbReportAnalytics } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";

const Navbar = ({show}) => {
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <ul>
                <li>
                    <NavLink to="/" onClick={() => show(!show)}> <IoMdHome /> Home</NavLink>
                </li>
                <li>
                    <NavLink to="/new-auction" onClick={() => show(!show)}> <RiAuctionFill/> New Auction </NavLink>
                </li>
                <li>
                    <NavLink to="/" onClick={() => show(!show)}><TbReportAnalytics /> Reports </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Navbar