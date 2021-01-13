import react, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from './cmps/Footer/Footer'
import Header from './cmps/Header/Header'
import Main from './pages/Main/Main'
import Home from './pages/Home/Home';
import BoxDetails from './pages/BoxDetails/BoxDetails'
import Player from './cmps/Player/Player'
import { gsap } from 'gsap'
import Login from './cmps/Login/Login'
import Alert from '@material-ui/lab/Alert';

import CreateBox from './cmps/CreateBox/CreateBox';

import { connect } from 'react-redux'

function App() {


  const [showCreateBox, setShowCreateBox] = useState(false)
  const [showLogin, setShowLogin] = useState({ show: false, type: '' })
  const [showSuccess, setShowSuccess] = useState(false)
  const { user } = useSelector(state => state.userReducer)

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

        {showLogin.show && !user &&
          <>
            <Login type={showLogin.type} showSuccess={setShowSuccess} />
            <div onClick={() => setShowLogin({ show: false, type: '' })} className="screen" />
          </>}

        {showSuccess && <Alert className="header__success" severity="success" >
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
        <Footer />
      </Router>
    </div >
  );
}


export default App;
