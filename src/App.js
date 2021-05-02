import "./App.css";
import { React, useState } from "react";
import SignIn from "./pages/SignIn.js";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage?.getItem("userObj"))?.profileObj
  );

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route exact path="/" component={SignIn}></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
