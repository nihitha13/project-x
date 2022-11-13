import { LandingPage } from "./Landing";
import { AccountDetails } from "./Components/AccountDetails";
import { MapView } from "./Components/MapView";
import Stats from "./Components/Stats";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/account/"
            element={<AccountDetails></AccountDetails>}
          ></Route>
          <Route path="/map/" element={<MapView></MapView>}></Route>
          <Route path="/stats/" element={<Stats></Stats>}></Route>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
