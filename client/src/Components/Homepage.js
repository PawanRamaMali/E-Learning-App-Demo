import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import LoginModal from './LoginModal'
import InstructorSignupModal from './InstructorSignupModal'
import { Jumbotron, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import "../App.css";

function Homepage(props) {
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [signupModalShow, setSignupModalShow] = useState(false);
    //importing global state
    const [isAuthenticatedUser, authObj] = useSelector((gState) => [
        gState.isAuthenticatedUser,
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
      }, [isAuthenticatedUser]);

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
        else {
            //user authenticated. no need to show login
            return (
                <Button className="homepage-buttons primary-button" variant="primary">Welcome, {authObj.fname}</Button>
            )
        }
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
                default:
                    routePath = "/";
                    break;
            }
            return (
                <Button className="homepage-buttons" variant="secondary" onClick={() => redirectRouter(routePath)}>My Dashboard</Button>
            )
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