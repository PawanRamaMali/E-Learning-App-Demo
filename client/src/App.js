import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
//Importing pages
import Home from "./pages/Home";
import InsLanding from "./pages/InsLanding";
import InsStudentRoster from "./pages/InsStudentRoster";
import InsCourseRoster from "./pages/InsCourseRoster";
import InsCourses from "./pages/InsCoursePage";
import ResetPassword from "./pages/ResetPassword";
//Protected Route component
import ProtectedRoute from "./Components/ProtectedRoute";
import Unauthorized from "./Components/Unauthorized";
//Importing CSS
import "./App.css";
import InsLessonPage from "./pages/InsLessonPage";

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
        <ProtectedRoute exact path="/instructor/courses" auth={isSessionValid()} component={InsCourses} />
        <ProtectedRoute exact path="/instructor/courses/lessons" auth={isSessionValid()} component={InsLessonPage} />
        <ProtectedRoute exact path="/instructor" auth={isSessionValid()} component={InsLanding} />
        <ProtectedRoute exact path="/instructor/student-roster" auth={isSessionValid()} component={InsStudentRoster} />
        <ProtectedRoute exact path="/instructor/courses/:id/roster" auth={isSessionValid()} component={InsCourseRoster} />
        <Route exact path="/unauthorized" component={Unauthorized} />
        <Route exact path="/user/auth/set-password" component={ResetPassword} />
      </Switch>
    </div>
  );
}

export default App;
