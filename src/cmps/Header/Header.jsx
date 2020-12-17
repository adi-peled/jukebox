import React from 'react'
import './Header.scss'
function Header() {
    return (
        <header className="header flex">
            <img className="header__logo" src="" alt="logo" />

            <ul className="header__nav flex">
                <li className="header__item">Boxes</li>
                <li className="header__item">Create Box</li>
                <li className="header__item">
                    <li className="header__item">
                        <img className="header__profile" src="" alt="profile" />
                    </li>
                    <ul className="profile__list"> 
                        <li className="profile__item">Signup</li>
                        <li className="profile__item">Login</li>
                        <li className="profile__item">Logout</li>
                    </ul>
                </li>
            </ul>
        </header>
    )
}

export default Header
