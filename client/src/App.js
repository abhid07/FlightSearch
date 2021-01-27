import './App.css';
import HomeComponent from './Component/HomeComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavComponent from './Component/NavComponent';
import AdminComponent from './Component/AdminComponent';



function App() {
  return (
    <div className="App">
      <Router>
        <NavComponent/>
        <Switch>
          <Route exact path="/">
            <HomeComponent/>
          </Route>
          <Route exact path="/admin">
            <AdminComponent/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
