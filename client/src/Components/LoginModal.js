import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import "../App.css";
//import login attempt action
import { loginAttempt } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function LoginModal(props) {
  //instantiating dispacther
  const dispatch = useDispatch();

  //form validation state declaration -- initial form state of validation: false
  const [validated, setValidated] = useState(false);
  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: ""
  });
  //importing global state
  const [isAuthenticatedUser, isFetchingAuth, error] = useSelector((gState) => [
    gState.isAuthenticatedUser,
    gState.isFetchingAuth,
    gState.error,
  ]);

  //Conditional Rendering
  //----------------------
  const renderLoginStatus = () => {
    if(isFetchingAuth) {return <Alert variant="info">Validating...</Alert>}
    if(isAuthenticatedUser) {return <Alert variant="success">Authenticated!</Alert>}
    if(error) {return <Alert variant="danger">{error}</Alert>}
  }

  //event handlers
  //----------------
  const handleInputChange = (e) => {
    //save current state
    const currState = {...loginCreds};
    //retrieve values form input changed
    const {name, value} = e.target;
    //update current State backup
    currState[name] = value;
    //set state
    setLoginCreds(currState);
  }

  //handleSubmit function to send credentials
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    //checking validation on Submit event
    if(form.checkValidity() !== false){
      //dispatch loginAttempt action and pass loginCreds
      dispatch(loginAttempt(loginCreds));
    }
    setValidated(true);
  }

    return (
      <Modal
        {...props} className="login-modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={ handleSubmit } >
                {renderLoginStatus()}
                <Form.Group id="formBasicEmail">
                    <Form.Label htmlFor="login-email">Email address</Form.Label>
                    <Form.Control 
                        name="email"
                        id="login-email" 
                        type="email" 
                        placeholder="Enter email" 
                        value={loginCreds.loginEmail}
                        onChange={handleInputChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please verify email is entered correctly.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group id="formBasicPassword">
                    <Form.Label htmlFor="login-password">Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        id="login-password"
                        aria-describedby="passwordHelpBlock" placeholder="Password"
                        value={loginCreds.loginPassword}
                        onChange={handleInputChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter password
                    </Form.Control.Feedback>
                </Form.Group>
                <Button className="primary-button" type="submit">Login</Button>
                <Button className="homepage-buttons"onClick={props.onHide} variant="secondary">Forgot Password</Button>
            </Form>
        </Modal.Body>   
      </Modal>
    );
  }

  export default LoginModal;