import React from 'react'
import {Card, Button, CardGroup} from "react-bootstrap"
import {useEffect, useState} from "react"
import { Redirect, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
export default function LessonCard(props) {
    const { lessons } = props
    
    const [authObj] = useSelector((gState) => [
        gState.authObj

      ]);   
    const history = useHistory()

    const videoRouter = (path) => {
        
        history.push(path)
    }
    
    return (
        <CardGroup className="card-container">
            {lessons ? (
                    lessons.map((lesson) => (
                        <Card key={ lesson.id } className="lesson-card">
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>{lesson.name}</Card.Title>
                                <Card.Text>
                                {lesson.description}
                                </Card.Text>
                                <Button variant="primary" url={lesson.url} onClick={(e) => videoRouter(e.currentTarget.url)}>Watch Video</Button>{" "}
                                 {authObj.role === "INSTRUCTOR" ? (
                                     <Button variant="danger" id="delButton" >Delete Lesson</Button>
                                 ):(<p></p>)}
                                
                            </Card.Body>
                        </Card>
                    )
        
                    )):(<p></p>)
                    
            }

        </CardGroup>
    )

}
