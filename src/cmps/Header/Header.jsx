import React, { useEffect, useState } from 'react'
import './Header.scss'
import { NavLink, useHistory} from 'react-router-dom'
import Login from '../Login/Login'
import { useSelector, useDispatch } from 'react-redux'
import { loadLoggedUser, signout } from '../../store/actions/userActions'

import CreateBox from '../CreateBox/CreateBox'

function Header() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userReducer)
    const [showMenu, setShowMenu] = useState(false)
    const [openLoginModal, setOpenLoginModal] = useState({ show: false, type: '' })
    const [openCreateModal, setOpenCreateModal] = useState(false)

    useEffect(async () => {
        dispatch(loadLoggedUser())
    }, [])

    return (
        <header className="header flex">
            <img className="header__logo" src="" alt="logo" onClick={() => history.push('/')} />
            <input className="header__search" placeholder="Search" />
            <ul className="header__nav flex">
                <li className="header__item">
                    <NavLink to="/main" className="header__link" exact >Boxes</NavLink>
                </li>
                <li className="header__item" onClick={() => setOpenCreateModal(true)}>
                    Create Box
                </li>
                <li className="header__item">
                    <img className="header__profile" src="" alt="profile" onClick={() => setShowMenu(!showMenu)} />
                    {showMenu && <>
                        <ul className="profile__list">
                            {!user && <>
                                <li onClick={() => setOpenLoginModal({ show: true, type: 'signup' })} className="profile__item">Signup</li>
                                <li onClick={() => setOpenLoginModal({ show: true, type: 'login' })} className="profile__item">Login</li>
                            </>}
                            {user && <li onClick={() => dispatch(signout())} className="profile__item">Logout</li>}
                        </ul>
                        <div onClick={() => setShowMenu(false)} className="screen" />
                    </>
                    }
                </li>
            </ul>

            {
                openLoginModal.show &&
                <>
                    <Login type={openLoginModal.type} />
                    <div onClick={() => setOpenLoginModal({ show: false, type: '' })} className="screen" />
                </>
            }

            {
                openCreateModal &&
                <>
                    <CreateBox />
                    <div onClick={() => setOpenCreateModal(false)} className="screen" />
                </>
            }

        </header >
    )
}

export default Header
