
import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from './cmps/Footer/Footer'
import Header from './cmps/Header/Header'
import Main from './pages/Main/Main'
import Home from './pages/Home/Home';
import BoxDetails from './cmps/BoxDetails/BoxDetails'
import Player from './cmps/Player/Player'

import { connect } from 'react-redux'
import { useEffect } from 'react';

function App(store) {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="app-container">
          <Switch>
            <Route component={BoxDetails} path="/boxDetails/:id" />
            <Route component={Main} path="/main" />
            <Route component={Home} path="/" />
          </Switch>
        </div>
        <Player/>
        <Footer />
      </Router>
    </div >
  );
}

const mapStateToProps = state => {
  return {
    song: state.song,
  }
}

export default connect(mapStateToProps)(App);
