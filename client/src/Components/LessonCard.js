import React from 'react'
import {Card, Button, CardGroup} from "react-bootstrap"
import {useEffect, useState} from "react"
import { Redirect, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getUrl } from '../actions'
import Player from "./Player"

export default function LessonCard(props) {
    const { lessons } = props
    
    const [authObj, url] = useSelector((gState) => [
        gState.authObj,
        gState.url
      ]);   
    const history = useHistory()
    const dispatch = useDispatch()

    const urlGetter = (e) => {
        // console.log(e.currentTarget.getAttribute("url"))
        let url = e.currentTarget.getAttribute("url")
        dispatch(getUrl(url))
        
    }

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
                                <div>
                                    {authObj.role === "STUDENT" ? (
                                        <Button className="primary-button" variant="primary" url={ lesson.url } onClick={(e) => {urlGetter(e) ; videoRouter("/student/courses/lessons")} }>Watch Video</Button>
                                    ): authObj.role === "INSTRUCTOR" ? (
                                        <div>
                                            <Button className="primary-button" variant="primary" url={ lesson.url } onClick={(e) => {urlGetter(e) ; videoRouter("/instructor/courses/lessons")} }>Watch Video</Button>{" "}
                                            <Button variant="danger" id="delButton">Delete Lesson</Button>
                                        </div>
                                    ):(<p></p>)}
                                 </div>
                                
                            </Card.Body>
                        </Card>
                    )
                )):(<p>NO LESSONS UPLOADED BY INSTRUCTOR</p>)    
            }
        </CardGroup>
    )

}
