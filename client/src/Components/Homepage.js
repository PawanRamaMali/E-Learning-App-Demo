import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import LoginModal from './LoginModal';
import InstructorSignupModal from './InstructorSignupModal';
import WelcomeToastWidget from './WelcomeToastWidget';
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
                case "ADMIN":
                    routePath = "/admin"
                    break
                case "STUDENT":
                    routePath = "/student";
                    break;

                default:
                    routePath = "/";
                    break;
            }
           
            return (
                <div as="div">
                    <Button className="homepage-buttons primary-button" variant="primary" onClick={() => redirectRouter(routePath)}>My Dashboard</Button>
                    <Button className="homepage-buttons" variant="secondary" onClick={() => performUserLogout()}>Logout</Button>
                    <WelcomeToastWidget />
                </div>
            )
        }
    }

    const performUserLogout = () => {
        if(isAuthenticatedUser){
            //dispatch logout action
            dispatch(logoutAttempt())
        }
    };

    return (
        < >
            <Jumbotron className="homepage-background" tag="div">
                <div className="homepage-content">
                    <h1 tag="div" className="">elearn | E-Learning-App-Demo</h1>
                    <p tag="div">
                        Revolutionizing distance learning for small format learning groups of all ages.
                    </p>
                    <p tag="div">
                        { renderLoginLogoutBtn() }
                        { renderInstSignupOrDash() }
                        <LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
                        <InstructorSignupModal show={signupModalShow} onHide={() => setSignupModalShow(false)} />
                    </p>
                </div>
            </Jumbotron>
        </>
    )
}

export default Homepage;