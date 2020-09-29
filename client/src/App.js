import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
//Importing pages
import Home from "./pages/Home";
import InsLanding from "./pages/InsLanding";
import InsStudentRoster from "./pages/InsStudentRoster";
import InsCourseRoster from "./pages/InsCourseRoster";
import Unauthorized from "./Components/Unauthorized";
//Protected Route component
import ProtectedRoute from "./Components/ProtectedRoute";
//Importing CSS
import "./App.css";

function App() {
  //importing from global state
  const [isAuthenticatedUser, authObj] = useSelector((gState) => [
    gState.isAuthenticatedUser,
    gState.authObj,
  ]);

  //verify __session validity if user is authenticated
  const isSessionValid = () => {
    if (isAuthenticatedUser) return authObj;
    return false;
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/instructor" auth={isSessionValid()} component={InsLanding} />
        <ProtectedRoute exact path="/instructor/student-roster" auth={isSessionValid()} component={InsStudentRoster} />
        <ProtectedRoute exact path="/instructor/courses/roster" auth={isSessionValid()} component={InsCourseRoster} />
        {/* <Route exact path="/instructor" component={InsLanding} /> */}
        <Route exact path="/unauthorized" component={Unauthorized} />
      </Switch>
    </div>
  );
}

export default App;
