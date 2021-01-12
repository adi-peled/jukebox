import React, { useEffect, useState } from 'react'
import './Header.scss'
import { NavLink, useHistory } from 'react-router-dom'
import Login from '../Login/Login'
import { useSelector, useDispatch } from 'react-redux'
import { loadLoggedUser, signout } from '../../store/actions/userActions'
import CreateBox from '../CreateBox/CreateBox'
import Alert from '@material-ui/lab/Alert';
//icons
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

function Header() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userReducer)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [openLoginModal, setOpenLoginModal] = useState({ show: false, type: '' })
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [showSuccess, setShowSuccess] = useState(false)
    useEffect(async () => {
        dispatch(loadLoggedUser())
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
    }, [])

    return (
        <header className="header flex">
            <img className="header__logo" src="" alt="logo" onClick={() => history.push('/')} />
            <div className="header__input-container flex">
                <input className="header__input-container--search" placeholder="Search" />
                <SearchIcon className="header__input-container--icon" />
            </div>
            <ul className="header__nav flex">
                <div className="relative">
                    {screenWidth < 600 && <>
                        <MenuIcon className="header__menu-icon" onClick={() => setShowMenu(!showMenu)} />
                        {showMenu && <div onClick={() => setShowMenu(false)} className="screen" />}

                    </>
                    }
                    {(screenWidth >= 600 || showMenu) && <div className={screenWidth < 600 ? 'menu' : 'flex'}>

                        <li className="header__item--menu">
                            <NavLink to="/main" className="header__link" exact >Boxes</NavLink>
                        </li>
                        <li className="header__item--menu" onClick={() => setOpenCreateModal(true)}>
                            Create Box
                       </li>
                    </div>}

                </div>

                <li className="header__item">
                    <PersonIcon className="header__profile" onClick={() => setShowProfileMenu(!showProfileMenu)} />
                    {showProfileMenu && <>
                        <ul className="profile__list">
                            {!user && <>
                                <li onClick={() => setOpenLoginModal({ show: true, type: 'signup' })} className="profile__item">Signup</li>
                                <li onClick={() => setOpenLoginModal({ show: true, type: 'login' })} className="profile__item">Login</li>
                            </>}
                            {user && <li onClick={() => dispatch(signout())} className="profile__item">Logout</li>}
                        </ul>
                        <div onClick={() => setShowProfileMenu(false)} className="screen" />
                    </>
                    }
                </li>
            </ul>

            {openLoginModal.show && !user &&
                <>
                    <Login type={openLoginModal.type} showSuccess={setShowSuccess} />
                    <div onClick={() => setOpenLoginModal({ show: false, type: '' })} className="screen" />
                </>}

            {showSuccess && <Alert className="header__success" severity="success" >
                success!   you now logged in
                </Alert>}
            {openCreateModal &&
                <>
                    <CreateBox openModal={setOpenCreateModal} />
                    <div onClick={() => setOpenCreateModal(false)} className="screen" />
                </>}

        </header >
    )
}

export default Header
