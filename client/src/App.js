import React from "react";
import "./App.css";
//Importing pages
import Home from "./pages/Home";
import { Route, Switch } from "react-router-dom";
import instructorHeader from "./Components/instructorHeader";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/instructor" component={instructorHeader} />
      </Switch>
    </div>
  );
}

export default App;
