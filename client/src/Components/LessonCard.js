import React from 'react'
import Card from "react-bootstrap/Card"
import {useEffect, useState} from "react"
import Button from "react-bootstrap/Button"
import { Redirect, useHistory } from "react-router-dom"
import {unmountComponentAtNode } from "react-dom"
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
    const hideDelete = () =>{
        console.log("Am not supposed to show")
        if (authObj.role === "STUDENT"){
            unmountComponentAtNode(document.getElementById("delButton"))
        }
    }


    return (
        <div>
            {lessons? (
                    lessons.map((lesson) => (
                        <Card key={ lesson.id } style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{lesson.name}</Card.Title>
                                <Card.Text>
                                 Some quick example text to build on the card title and make up the bulk of
                                 the card's content.
                                </Card.Text>
                                <Button variant="primary" url={lesson.url} onClick={(e) => videoRouter(e.currentTarget.url)}>Watch Video</Button>
                                <Button variant="Danger" id="delButton" display={hideDelete}>Delete Lesson</Button>
                            </Card.Body>
                    </Card>
                    )
        
                    )):(<p></p>)
                    
            }




        </div>
    )

}
