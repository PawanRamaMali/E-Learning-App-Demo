import React from 'react'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useDispatch }  from "react-redux"
import { setCourseId } from "../actions"

export default function CourseCard(props) {

    const dispatch = useDispatch();


   const { courses } = props
   console.log(courses)

   const viewLessons = (e) => {
    let course_Id = e.currentTarget.id
    dispatch(setCourseId(course_Id))
   
    window.location.href = '/instructor/courses/lessons';
    
}


   
    return (

        
        <div>
            {courses? (

                    courses.map((course) => (
                        <Card key={ course.id } style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                <Card.Title>{ course["course_name"] }</Card.Title>
                                <Card.Text>
                                {course.subject}
                                 Some quick example text to build on the card title and make up the bulk of
                                 the card's content.
                                </Card.Text>
                                <Button variant="primary" id={ course.id } onClick={(e) => viewLessons(e)}>View Lessons</Button>
                            </Card.Body>
                    </Card>
                    )
        
                    )):(<p></p>)
                    
            }
            
        </div>
    )
}

                    
                    

