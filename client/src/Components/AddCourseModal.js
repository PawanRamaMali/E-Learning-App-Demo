import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import "../App.css";
//import addCourseAttempt action
import { addCourseAttempt } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function AddCourseModal(props) {
  //instantiating dispacther
  const dispatch = useDispatch();

  //form validation state declaration -- initial form state of validation: false
  const [validated, setValidated] = useState(false);
  const [courseData, setCourseData] = useState({
    course_name: "",
    subject: "",
    user_id: ""
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
    const currState = {...courseData};
    //retrieve "name" attribute values form input changed
    const {name, value} = e.target;
    currState[name] = value;
    //update current State backup
    setCourseData(currState);
    // console.log("This is what we entered in form", currState)
  }

  //handleSubmit function to send student data
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    //checking validation on Submit event
    if(form.checkValidity() !== false && isAuthenticatedUser){
      // console.log("Is this student data?", studentData)
      //dispatch addCourseAttempt action and pass courseData
      dispatch(addCourseAttempt(courseData, authObj.accessToken));
      return <Alert variant="success">Course Added!</Alert>
    } 
    setValidated(true);
  

    if(error) {return <Alert variant="danger">{error}</Alert>}
      
  }

    return (
      <Modal
        {...props} className="course-modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="contained-modal-title-vcenter">
            Add Course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated}>
                <Form.Group className="course-name" >
                    <Form.Control id="signup-first-name" type="text" placeholder="Course Name" 
                        name="course_name"
                        value={courseData.course_name}
                        onChange={handleInputChange}
                        required />
                </Form.Group>
                <Form.Group className="exampleForm.ControlSelect1">
                  <Form.Label>Select Course Subject</Form.Label>
                    <Form.Control as="select" 
                    name="subject"
                    value={courseData.subject} 
                    onChange={handleInputChange} 
                    required>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="Social Studies">Social Studies</option>
                      <option value="Language Arts">Language Arts</option>
                      <option value="Computer Science">Computer Science</option>
                    </Form.Control>
                </Form.Group>
                <Button className="primary-button add-course" onClick={ handleSubmit } >Add Course</Button>
            </Form>
        </Modal.Body>   
      </Modal>
    );
  }

  export default AddCourseModal;