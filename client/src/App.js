import { LandingPage } from './Landing';
import { AccountDetails } from './components/AccountDetails';
import { MapView } from './components/MapView';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/account/" element={<AccountDetails></AccountDetails>}>         
          </Route>
          <Route path="/map/" element={<MapView></MapView>}>         
          </Route>
          <Route path="/" element={<LandingPage></LandingPage>}>         
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
