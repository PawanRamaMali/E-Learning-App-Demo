import React from 'react'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

export default function CourseCard(props) {
   const { courses } = props
   console.log(courses)

   const viewLessons = (e, id) => {
    console.log("am here")
    window.location.href = '/instructor/courses/lessons';
    console.log(id)
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
                                <Button variant="primary" onClick={(e) => viewLessons(course.id)}>View Lessons</Button>
                            </Card.Body>
                    </Card>
                    )
        
                    )):(<p></p>)
                    
            }
            
        </div>
    )
}

                    
                    

