import React, { useState } from 'react'
import './Header.scss'
import { NavLink, useHistory, Link } from 'react-router-dom'
function Header() {
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false)
    return (
        <header className="header flex">
            <img className="header__logo" src="" alt="logo" onClick={() => history.push('/')} />
            <input className="header__search" placeholder="Search" />
            <ul className="header__nav flex">
                <li className="header__item">
                    <NavLink to="/main" className="header__link" exact >Boxes</NavLink>
                </li>
                <li className="header__item">
                    <NavLink to="/create" className="header__link" exact >Create Box</NavLink>
                </li>
                <li className="header__item">
                    <img className="header__profile" src="" alt="profile" onClick={() => setShowMenu(!showMenu)} />
                    {showMenu && <ul className="profile__list">
                        <li className="profile__item">Signup</li>
                        <li className="profile__item">Login</li>
                        <li className="profile__item">Logout</li>
                    </ul>}
                </li>
                <li className="header__item">

                </li>
            </ul>
        </header >
    )
}

export default Header
