import NewAuction from '../pages/NewAuction';
import Home from '../pages/Home';
import { NavLink } from 'react-router-dom';

const Navbar = ({show}) => {
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/new-auction">New Auction</NavLink>
                </li>
                <li>
                    <NavLink to="/">Reports</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Navbar