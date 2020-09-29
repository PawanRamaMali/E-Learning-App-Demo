import React from 'react'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

export default function CourseCard(props) {
   const { courses } = props
   console.log(courses)
    
   

    return (
        <div>
            
            <Card key={ props.id } style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                        <Card.Title>{ props["course_name"] }</Card.Title>
                        <Card.Text>
                         Some quick example text to build on the card title and make up the bulk of
                         the card's content.
                        </Card.Text>
                        <Button variant="primary">View Lessons</Button>
                    </Card.Body>
            </Card>
           
            
        </div>
    )
}
