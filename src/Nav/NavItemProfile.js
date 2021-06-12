import React from 'react'

const NavItemProfile = ({imgURL}) => {
    return (
        <li className="nav-item">
            <a href="#" className="icon-button">
                <img src={imgURL}/>
            </a>
        </li>
    )
}
export default NavItemProfile