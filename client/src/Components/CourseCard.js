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
    // console.log(courses)


    const redirectRouter = (path) => {
        history.push(path)
    }

    const viewLessons = (e) => {
            let course_Id = e.currentTarget.id
            dispatch(setCourseId(course_Id))
    }


   
    return (
        <CardGroup className="card-container">
            {courses ? (

                    courses.map((course) => (
                        <Card key={ course.id } className="course-card" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="..src/img/dolphins2.jpg" />
                                <Card.Body>
                                <Card.Title>{ course["course_name"] }</Card.Title>
                                <Card.Text>
                                    {course.subject}
                                  
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary" id={ course.id } onClick={(e) => {viewLessons(e) ; redirectRouter('/instructor/courses/lessons/')} }>View Lessons</Button>
                            </Card.Body>
                        </Card>
                    )     
                    )):(<p></p>)
            } 
        </CardGroup>
    )
}

                    
                    

