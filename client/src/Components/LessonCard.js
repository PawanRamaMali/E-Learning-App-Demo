import React from 'react'
import Card from "react-bootstrap/Card"
import {useEffect, useState} from "react"
import Button from "react-bootstrap/Button"
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
    console.log(e.currentTarget.getAttribute("url"))
    let url = e.currentTarget.getAttribute("url")
    dispatch(getUrl(url))
      
}

    const videoRouter = (path) => {
        
        history.push(path)
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
                                <Button variant="primary" url={ lesson.url } onClick={(e) => {urlGetter(e) ; videoRouter("/student/courses/lessons")} }>Watch Video</Button>{" "}
                                 {authObj.role === "INSTRUCTOR" ? (
                                     <Button variant="danger" id="delButton" >Delete Lesson</Button>
                                 ):(<p></p>)}
                                
                            </Card.Body>
                    </Card>
                    )
        
                    )):(<p>NO LESSONS UPLOADED BY INSTRUCTOR</p>)
                    
            }




        </div>
    )

}
