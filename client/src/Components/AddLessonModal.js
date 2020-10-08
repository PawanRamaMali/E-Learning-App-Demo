import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import "../App.css";
//import addCourseAttempt action
import { addLessonAttempt } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function AddLessonModal(props) {
  //instantiating dispacther
  const dispatch = useDispatch();

  //form validation state declaration -- initial form state of validation: false
  const [validated, setValidated] = useState(false);
  const [lessonData, setLessonData] = useState({
    name: "",
    description: "",
    url: "",
    CourseId: ""
  });

  //importing global state
  const [isAuthenticatedUser, authObj, lessonObj,error] = useSelector((gState) => [
    gState.isAuthenticatedUser,
    gState.authObj,
    gState.lessonObj,
    gState.error
   
  ]);

  //event handlers
  //----------------
  const handleInputChange = (e) => {
    //save current state
    const currState = {...lessonData};
    //retrieve "name" attribute values form input changed
    const {name, value} = e.target;
    currState[name] = value;
    //update current State backup
    setLessonData(currState);
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
      dispatch(addLessonAttempt(lessonData, authObj.accessToken));
      return <Alert variant="success">Lesson Added!</Alert>
    } 
    setValidated(true);
  

    if(error) {return <Alert variant="danger">{error}</Alert>}
      
  }

    return (
      <Modal
        {...props} className="lesson-modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="contained-modal-title-vcenter">
            Add Lesson
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated}>
                <Form.Group className="lesson-name" >
                    <Form.Control id="lessonName" type="text" placeholder="Lesson Name" 
                        name="lesson_name"
                        value={lessonData.name}
                        onChange={handleInputChange}
                        required />
                </Form.Group>
                <Form.Group className="lesson-description">
                    <Form.Label>Enter Lesson Description</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Button className="primary-button add-lesson" onClick={ handleSubmit } >Add Lesson</Button>
            </Form>
        </Modal.Body>   
      </Modal>
    );
  }

  export default AddLessonModal;