import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import "../App.css";
//import updateStudentAttempt action
import { updateStudentAttempt } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function UpdateStudentModal(props) {
  //instantiating dispacther
  const dispatch = useDispatch();

  //form validation state declaration -- initial form state of validation: false
  const [validated, setValidated] = useState(false);
  const [studentData, setStudentData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "STUDENT",
    crsid: "1"
  });

  //importing global state
  const [isAuthenticatedUser, authObj, error] = useSelector((gState) => [
    gState.isAuthenticatedUser,
    gState.authObj,
    gState.error
  ]);

  //event handlers
  //----------------
  const handleInputChange = (e) => {
    //save current state
    const currState = {...studentData};
    //retrieve "name" attribute values form input changed
    const {name, value} = e.target;
    currState[name] = value;
    //update current State backup
    setStudentData(currState);
    // console.log("This is what we entered in form", currState)
  }

  //handleSubmit function to send student data
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    //checking validation on Submit event
    if(form.checkValidity() !== false && isAuthenticatedUser){
      //dispatch addStudentAttempt action and pass studentData
      dispatch(updateStudentAttempt(studentData, authObj.accessToken));
      return <Alert variant="success">Student Updated!</Alert>
    } 
    setValidated(true);

    if(error) {return <Alert variant="danger">{error}</Alert>}  
  }

    return (
      <Modal
        {...props} className="update-modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="contained-modal-title-vcenter">
            Update Student
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated}>
                <Form.Group className="signup-first-name" >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control id="signup-first-name" type="text" placeholder="First name" 
                        name="first_name"
                        value={studentData.first_name}
                        onChange={handleInputChange}
                        required />
                </Form.Group>
                <Form.Group className="signup-last-name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control id="signup-last-name" type="text" placeholder="Last name" 
                        name="last_name"
                        value={studentData.last_name}
                        onChange={handleInputChange}
                        required />
                </Form.Group>
                <Form.Group className="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control id="userID-Login" type="email" placeholder="Enter email"
                      name="email"
                      value={studentData.email}
                      onChange={handleInputChange}
                      required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="exampleForm.ControlSelect1">
                  <Form.Label>Select Course</Form.Label>
                    <Form.Control as="select" 
                    name="crsid"
                    value={studentData.crsid} 
                    onChange={handleInputChange} 
                    required>
                      <option value="1">Test Course One</option>
                      <option value="2">Test Course Two</option>
                      <option value="3">Test Course Three</option>
                    </Form.Control>
                </Form.Group>
                {/* <Form.Group className="formBasicPassword">
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock" 
                        placeholder="Password"
                        name="password"
                        value={studentData.password} 
                        onChange={handleInputChange} 
                        required
                    />
                    <Form.Text className="passwordHelpBlock" muted>
                        Password must be 8-20 characters long, contain letters and numbers, and
                        must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="formBasicPassword">
                    <Form.Label htmlFor="inputPassword5">Re-enter Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Re-enter Password"
                        name="password"
                        value={studentData.password} 
                        onChange={handleInputChange} 
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter valid password
                    </Form.Control.Feedback>
                </Form.Group> */}
                <Button className="primary-button update-student"  onClick={ handleSubmit } >Update Student</Button>
            </Form>
        </Modal.Body>   
      </Modal>
    );
  }

  export default UpdateStudentModal;