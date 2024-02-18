const Navbar = ({show}) => {
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <ul>
                <li>
                    <a href='/'>Home</a>
                </li>
                <li>
                    <a href='/'>New Auction</a>
                </li>
                <li>
                    <a href='/'>Reports</a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar