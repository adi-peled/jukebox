
import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from './cmps/Footer/Footer'
import Header from './cmps/Header/Header'
import Main from './pages/Main/Main'
import Home from './pages/Home/Home';
import BoxDetails from './cmps/BoxDetails/BoxDetails'

function App() {
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
        <Footer />
      </Router>
    </div >
  );
}

export default App;
