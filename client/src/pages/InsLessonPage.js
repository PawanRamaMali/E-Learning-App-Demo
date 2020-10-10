import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import AddLessonModal from "../Components/AddLessonModal";
import LessonCard from "../Components/LessonCard";
import AppNavbar from '../Components/AppNavbar';
import {getLessons} from '../actions';
import {Jumbotron, Button } from "react-bootstrap";
import Player from "../Components/Player";


export default function InsLessonPage(props) {
    const dispatch = useDispatch()
    //importing global state
    const [courseId, lessons, authObj, url] = useSelector((gState) => [
        gState.courseId,
        gState.lessons,
        gState.authObj,
        gState.url
      ]);

    const [showLessonModal, setShowLessonModal] = useState(false);

    useEffect(() => {
        dispatch(getLessons(authObj.accessToken, courseId));
    },[courseId , authObj.accessToken]);

    const history = useHistory();
    //redirecting function
    const redirectRouter = (routePath) => {
        history.push(routePath);
    }
    
  
    return (
        <div>
            <AppNavbar />
            <Jumbotron className="ins-lessons-hero portal-sublanding-background">
                <div className="instructor-landing-content homepage-content">
                    <h1 className="">POD | {props.courseName} Instructor Lessons</h1>
                    <p>
                        View and manage your {props.courseName} Lessons!
                    </p>
                    <p className="btngroup">
                        <Button className="InsBtn primary-button" onClick={() => {setShowLessonModal(true)}}>ADD LESSON</Button>
                        <Button className="InsBtn Dashboard primary-button" onClick={() => redirectRouter("/instructor")}>VIEW DASHBOARD</Button>
                        <AddLessonModal show={showLessonModal} onHide={() => setShowLessonModal(false)} />
                    </p>
                </div>
            </Jumbotron>
            {
                url ? (
                    <div className="video-container">
                        <div><Player/></div>
                        <div><LessonCard lessons={lessons.data} /> </div>
                    </div> 
                ) : (
                    <div className="noVideo"><LessonCard lessons={lessons.data} /></div>
                )
            }
        </div>
    )
}
