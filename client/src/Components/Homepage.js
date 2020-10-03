import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import LoginModal from './LoginModal'
import InstructorSignupModal from './InstructorSignupModal'
import { Jumbotron, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { logoutAttempt } from "../actions";
import "../App.css";

function Homepage(props) {
    const dispatch = useDispatch();
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [signupModalShow, setSignupModalShow] = useState(false);
    //importing global state
    const [isAuthenticatedUser, isLoggedOutSuccess, authObj] = useSelector((gState) => [
        gState.isAuthenticatedUser,
        gState.isLoggedOutSuccess,
        gState.authObj,
    ]);
    //useHistory hook to redirect to desired routes
    const history = useHistory();

    //using useEffect to track isAuthenticatedUser changes
    //and hide login modal after successfull signin
    useEffect(() => {
        if (isAuthenticatedUser){
            setLoginModalShow(false);
        }
        if(!isAuthenticatedUser && isLoggedOutSuccess){
            redirectRouter("/");
        }
      }, [isAuthenticatedUser, isLoggedOutSuccess]);

    //redirecting function
    const redirectRouter = (routePath) => {
        history.push(routePath);
    }

    //function to render login or logout btn
    const renderLoginLogoutBtn = () => {
        if (!isAuthenticatedUser){
            return (
                <Button className="homepage-buttons primary-button" variant="primary" onClick={() => 
                    setLoginModalShow(true)}>Login</Button>
            );
        }
        // else {
        //     //user authenticated. no need to show login
        //     return (
        //         <Button className="homepage-buttons primary-button" variant="primary">Welcome, {authObj.fname}</Button>
        //     )
        // }
    }

    //function to render instructor signup or take
    //to dashboard button
    const renderInstSignupOrDash = () => {
        if (!isAuthenticatedUser) {
            return (
                <Button className="homepage-buttons" variant="secondary" onClick={() => setSignupModalShow(true)}>Become an Instructor</Button>
            )
        }
        else {
            let routePath = "";
            switch (authObj.role.toUpperCase()) {
                case "INSTRUCTOR":
                    routePath = "/instructor";
                    break;
                case "STUDENT":
                    routePath = "/student";
                    break;

                default:
                    routePath = "/";
                    break;
            }
           
            return (
                < >
                    <Button className="homepage-buttons primary-button" variant="primary" onClick={() => redirectRouter(routePath)}>My Dashboard</Button>
                    <Button className="homepage-buttons" variant="secondary" onClick={() => performUserLogout()}>Logout</Button>
                </>
            )
        }
    }

    const performUserLogout = () => {
        if(isAuthenticatedUser){
            //dispatch logout action
            dispatch(logoutAttempt())
        }
    }

    return (
        <Jumbotron className="homepage-background">
            <div className="homepage-content">
                <h1 className="">POD | E-Learning</h1>
                <p>
                    Revolutionizing distance learning for small format learning groups of all ages.
                </p>
                <p>
                    { renderLoginLogoutBtn() }
                    { renderInstSignupOrDash() }
                    <LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
                    <InstructorSignupModal show={signupModalShow} onHide={() => setSignupModalShow(false)} />
                </p>
            </div>
        </Jumbotron>
    )
}

export default Homepage;