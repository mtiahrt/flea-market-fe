import React from 'react';
import {Link} from 'react-router-dom';

const NavItemProfile = ({imgURL}) => {
    return (
        <li className="nav-item">
            <Link to="/Profile" className="icon-button">
                <img alt='profile' src={imgURL}/>
            </Link>
        </li>
    )
}
export default NavItemProfile