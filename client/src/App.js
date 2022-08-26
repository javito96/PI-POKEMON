import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './component/LandingPage'
import Home from './component/Home';
import Detail from './component/Detail'
import PokeCreate from './component/CreatePoke'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/detail/:id' component={Detail}/>
      <Route path='/poke' component={PokeCreate}/>
      
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
