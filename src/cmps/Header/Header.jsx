import React, { useEffect, useState } from 'react'
import './Header.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadLoggedUser, signout } from '../../store/actions/userActions'
import { setFilter } from '../../store/actions/boxActions'
//icons
import jukeBox from '../../assets/img/equalizerLogo.png'
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

function Header({ toggleShowBox, toggleShowLogin }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userReducer)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isScroll, setIsScroll] = useState(false)

    function onScroll() {
        if (window.scrollY > 0) {
            setIsScroll(true)
        }
        else {
            setIsScroll(false)
        }
    }

    useEffect(() => {
        // dispatch(loadLoggedUser())
        window.addEventListener("scroll", onScroll)
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
    }, [])


    function onSearch(txt) {
        history.push(`/main`)
        dispatch(setFilter({ name: txt, genre: '' }))
    }


    return (
        <header onScroll={onScroll} className={isScroll ? "header flex sticky" : "header flex "}>
            <img className="header__logo" src={jukeBox} alt="logo" onClick={() => history.push('/')} />
            <div className="header__input-container flex">
                <input
                    className="header__input-container--search"
                    placeholder="Search"
                    onChange={(ev) => onSearch(ev.target.value)}
                />
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
                        <li className="header__item--menu" onClick={() => toggleShowBox(true)}>
                            New Box
                       </li>
                    </div>}

                </div>

                <li className="header__item">
                    <PersonIcon className="header__profile" onClick={() => setShowProfileMenu(!showProfileMenu)} />
                    {showProfileMenu && <>
                        <ul className="profile__list">
                            {(!user|| user.isGuest) && <>
                                <li onClick={() => toggleShowLogin({ show: true, type: 'signup' })} className="profile__item">Signup</li>
                                <li onClick={() => toggleShowLogin({ show: true, type: 'login' })} className="profile__item">Login</li>
                            </>}
                            {(user&& !user.isGuest)  && <li onClick={() => dispatch(signout())} className="profile__item">Logout</li>}
                        </ul>
                        <div onClick={() => setShowProfileMenu(false)} className="screen" />
                    </>
                    }
                </li>
            </ul>





        </header >
    )
}

export default Header
