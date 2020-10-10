import React from 'react';
import {Card, Button, CardGroup} from "react-bootstrap";
import { useDispatch }  from "react-redux";
import { setCourseId } from "../actions";
import { Redirect, useHistory } from "react-router-dom";

export default function StuCourseCard(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { courses } = props;
    
    const redirectRouter = (path) => {
        history.push(path)
    }

    const viewLessons = (e) => {
        let course_Id = e.currentTarget.id;
        dispatch(setCourseId(course_Id));      
    }
   
    return (
        <CardGroup className="card-container">
            {courses? (
                courses.map((course) => (
                    <Card key={ course.Users_Courses.courseId } style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{ course["course_name"] }</Card.Title>
                            <Card.Text>
                            {course.subject}
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button className="primary-button" variant="primary" id={ course.Users_Courses.courseId } onClick={ (e) => {viewLessons(e) ; redirectRouter('/student/courses/lessons')} }>View Lessons</Button>
                        </Card.Body>
                    </Card>
                ))
                ):(<p>No Courses Added</p>)   
            }
        </CardGroup>
    )
};