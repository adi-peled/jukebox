
import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from './cmps/Footer/Footer'
import Header from './cmps/Header/Header'
import Main from './pages/Main/Main'
import Home from './pages/Home/Home';



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>

          <Route component={Home} path="/" />
          <Route component={Main} path="/main" />
        </Switch>
        <Footer />
      </Router>
    </div >
  );
}

export default App;
