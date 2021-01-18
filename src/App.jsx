import react, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
//Socket
import { userService } from './services/userService'

import { socketService } from './services/socketService'
import io from 'socket.io-client'

//cmps

import Header from './cmps/Header/Header'
import Main from './pages/Main/Main'
import Home from './pages/Home/Home';
import BoxDetails from './pages/BoxDetails/BoxDetails'
import Player from './cmps/Player/Player'
import Login from './cmps/Login/Login'
import Alert from '@material-ui/lab/Alert';
import CreateBox from './cmps/CreateBox/CreateBox';
//scss
import './App.scss';
import { gsap } from 'gsap'
function App() {

  const [showCreateBox, setShowCreateBox] = useState(false)
  const [showLogin, setShowLogin] = useState({ show: false, type: '' })
  const [showSuccess, setShowSuccess] = useState(false)
  const { user } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  useEffect(async () => {
    console.log('created');
    if (!user) {
      console.log('no user');

      const loggedUser = await userService.getUser()
      if (loggedUser) {
        dispatch({ type: 'SET_USER', user: loggedUser })
      } else {
        let guest = sessionStorage.getItem('guest')
        if (!guest) {
          console.log('no guest');

          const randomNum = Math.floor(Math.random() * 9999)
          guest = {
            username: `guest_${randomNum}`,
            imgString: '',
            favs: [],
            isGuest: truef
          }
          sessionStorage.setItem('guest', JSON.stringify(guest))
          dispatch({ type: 'SET_USER', user: JSON.parse(guest) })
        } else {
          dispatch({ type: 'SET_USER', user: guest })
        }
      }
    }
  }, [])



  return (
    <div className="app">
      <Router>
        <Header
          toggleShowBox={setShowCreateBox}
          toggleShowLogin={setShowLogin}
        />
        {showCreateBox &&
          < >
            <CreateBox openModal={setShowCreateBox} />
            <div onClick={() => setShowCreateBox(false)} className="screen" />
          </>}

        {showLogin.show && user.isGuest &&
          <>
            <Login type={showLogin.type} showSuccess={setShowSuccess} />
            <div onClick={() => setShowLogin({ show: false, type: '' })} className="screen" />
          </>}

        {showSuccess && <Alert className="success" severity="success" >
          success!   you now logged in
                </Alert>}
        <div className="app-container">
          <Switch>
            <Route component={BoxDetails} path="/boxDetails/:id" />
            <Route component={Main} path="/main/:genre" />
            <Route component={Main} path="/main" />
            <Route component={Home} path="/" />
          </Switch>
        </div>
        <Player />
      </Router>
    </div >
  );
}


export default App;
