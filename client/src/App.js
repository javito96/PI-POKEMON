import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './component/LandingPage'
import Home from './component/Home';
import Detail from './component/Detail'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      {/* <Route path='/detail/:id' component={Detail}/> */}
      {/* <Route path='/poke' component={CreatePoke}/> */}
      
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
