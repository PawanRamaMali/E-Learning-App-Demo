import React from 'react';
import {Card, Button, CardGroup}  from "react-bootstrap";
import { useDispatch }  from "react-redux";
import { setCourseId } from "../actions";
import { Redirect, useHistory } from "react-router-dom";
import "../App.css";


export default function CourseCard(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { courses } = props;

    const redirectRouter = (path) => {
        history.push(path)
    }

   const viewLessons = (e) => {
    let course_Id = e.currentTarget.id
    console.log(e)
    dispatch(setCourseId(course_Id))    
}

    return (
        <CardGroup className="card-container">
            {courses ? (
                    courses.map((course) => (
                        <Card key={ course.id } className="course-card">
                                <Card.Img variant="top" className="card-image" />
                                <Card.Body>
                                <Card.Title>{ course["course_name"] }</Card.Title>
                                <Card.Text>
                                    {course.subject}
                                  
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button className="primary-button" variant="primary" id={ course.id } onClick={(e) => {viewLessons(e) ; redirectRouter('/instructor/courses/lessons/')} }>View Lessons</Button>
                            </Card.Body>
                        </Card>
                    )     
                    )
                ):(<p></p>)
            } 
        </CardGroup>
    )
};

                    
                    

