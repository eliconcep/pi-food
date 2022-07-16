import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateFood from './components/CreateFood';
import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path="/home/:id" component={Details}></Route>
        <Route path='/recipes' component={CreateFood}></Route>
      </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
