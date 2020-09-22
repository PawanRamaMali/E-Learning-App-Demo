import React, {useState} from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import "../App.css";
import LoginModal from './LoginModal'
import InstructorSignupModal from './InstructorSignupModal'

function Homepage(props) {
    const [loginModalShow, setLoginModalShow] = React.useState(false);
    const [signupModalShow, setSignupModalShow] = React.useState(false);

    return (
        <Jumbotron className="homepage-background">
            <div className="homepage-content">
                <h1 className="">POD | E-Learning</h1>
                <p>
                    Revolutionizing distance learning for small format learning groups of all ages.
                </p>
                <p>
                    <Button className="homepage-buttons primary-button" variant="primary" onClick={() => 
                    setLoginModalShow(true)}>Login</Button>
                    <Button className="homepage-buttons" variant="secondary" onClick={() => 
                    setSignupModalShow(true)}>Become an Instructor</Button>
                    <LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
                    <InstructorSignupModal show={signupModalShow} onHide={() => setSignupModalShow(false)} />
                </p>
            </div>
        </Jumbotron>
    )
}

export default Homepage;