import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert, Container, Row, Col, Form, Button } from "react-bootstrap";
import { parse } from "query-string";
import { useHistory } from "react-router-dom";
import { validateResetPassToken, passwordResetAttempt } from "../actions";
import "../instructor.css";


/**
 * HELPER FUNCTIONS
 */
function parseToken(queryToken) {
    
    if(!queryToken || queryToken === "" || queryToken === undefined || queryToken === null){
        //redirection to 404
        return "404";
    }
    else if(queryToken && queryToken !== ""){
        const _token = parse(queryToken).token || "";
        //check if token is empty
        if(_token !== ""){
            //dispatch validation action
            return _token;
        }
        else{
            //redirect to 404
            return "404";
        }
    }
    else{
        return "404";
    }
}


export default function ResetPassword(props) {
    const dispatch = useDispatch();
    //useHistory hook to redirect to desired routes
    const history = useHistory();
    const [isValidPassResTok, isValidatingPassResTok, isResetingPassword, isPasswordResetSuccess, resPassUid, appMsg, error] = useSelector((gState) => [
        gState.isValidPassResTok,
        gState.isValidatingPassResTok,
        gState.isResetingPassword,
        gState.isPasswordResetSuccess,
        gState.resPassUid,
        gState.appMsg,
        gState.error
    ]);
    //form validation state declaration -- initial form state of validation: false
    const [validated, setValidated] = useState(false);
    const [validationError, setValidationError] = useState("");
    const [newPass, setNewPass] = useState({
        password: "",
        confirm: ""
    });

    useEffect(() => {
        const _token = parseToken(props.location.search);
        //checking for token
        switch (_token) {
            case "404":
                console.log("token error");
                break;
        
            default:
                // dispatch(validateResetPassToken(".eyJpZCI6MywiaWF0IjoxNjAyMTI5NzEwLCJleHAiOjE2MDIyMTYxMTB9.ZM6i2yEJPR3w2fvcv6LhVQLOXOWhF9tfhNS06A4RHWE"));
                dispatch(validateResetPassToken(_token));
                break;
        }
    }, []);

    //event handlers
    //----------------
    const handleInputChange = (e) => {
        //save current state
        const currState = {...newPass};
        //retrieve values form input changed
        const {name, value} = e.target;
        //update current State backup
        currState[name] = value;
        //set state
        setNewPass(currState);
    }
    //handleSubmit function to send credentials
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        //checking validation on Submit event
        if(form.checkValidity() !== false){
            // check password criteria
            if(newPass.password.length < 8 || newPass.password.length > 20){
                setValidationError("Password does not meet length criteria.");
            }
            else if(newPass.password !== newPass.confirm){
                setValidationError("Passwords do not match.");
            }
            else {
                setValidationError("");
                //dispatch loginAttempt action and pass loginCreds
                dispatch(passwordResetAttempt(newPass.password, resPassUid, parseToken(props.location.search)));
            }
        }
        setValidated(true);
    }

    const msgRender = () => {
        if (validationError !== ""){
            return (
                <Alert variant="danger">{validationError}</Alert>
            )
        }
        if (isResetingPassword) {
            return (
                <Alert variant="info">Processing...</Alert>
            )
        }
        else{
            if(isPasswordResetSuccess) {
                //call function to redirect to homepage
                //after a couple of seconds
                setTimeout( () => { history.push("/") }, 2000);
               return (
                <Alert variant="success">{appMsg}</Alert>
               ) 
            }
            else if(!isPasswordResetSuccess && error !== ""){
               return (
                <Alert variant="danger">{error}</Alert>
               )
            }
        }
    }
    
    const returnFrag = () => {
        //conditional rendering
        if (isValidPassResTok){
           return (
                <>
                    <h4 className="">New Password Form</h4>
                    <Form noValidate validated={validated} onSubmit={ handleSubmit }>
                        <Form.Group controlId="rstPassMain">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                name="password"
                                type="password" 
                                placeholder="Password" 
                                value={newPass.password}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Text className="text-muted">
                                Must be 8-20 characters long.
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please enter new password
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="rstPassConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="confirm"
                                placeholder="Confirm Password" 
                                value={newPass.confirm}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Passwords must match.
                            </Form.Control.Feedback>
                        </Form.Group>
                        {msgRender()}
                        <Button variant="primary" type="submit" disabled={isPasswordResetSuccess}>
                            Submit
                        </Button>
                    </Form>
                </>
           ) 
        }
        else if(!isValidPassResTok && isValidatingPassResTok){
            return (
                <h1 className="">Validating...</h1>
            ) 
        }
        else if(!isValidPassResTok && !isValidatingPassResTok){
            return (
                <h1 className="">Access Denied.</h1>
            ) 
        }
        else {
            return (
                <h1 className="">Access Denied.</h1>
            ) 
        }
    }
        
    return (
        <React.Fragment> 
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                    { returnFrag() }
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
