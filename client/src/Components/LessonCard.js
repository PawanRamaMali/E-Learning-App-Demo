import React from 'react'
import Card from "react-bootstrap/Card"
import {useEffect, useState} from "react"
import Button from "react-bootstrap/Button"
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
        <div>
            {lessons? (
                    lessons.map((lesson) => (
                        <Card key={ lesson.id } style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>{lesson.name}</Card.Title>
                                <Card.Text>
                                 Some quick example text to build on the card title and make up the bulk of
                                 the card's content.
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




        </div>
    )

}
