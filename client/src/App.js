import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
//Importing pages
import Home from "./pages/Home";
import Unauthorized from "./Components/Unauthorized";
//Protected Route component
import ProtectedRoute from "./Components/ProtectedRoute";

import InsLanding from "./pages/InsLanding";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/instructor" component={InsLanding} />
        {/* <Route exact path="/instructor" component={InsLanding} /> */}
        <Route exact path="/unauthorized" component={Unauthorized} />
      </Switch>
    </div>
  );
}

export default App;
