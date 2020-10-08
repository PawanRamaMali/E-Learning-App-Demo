import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import AddLessonModal from "../Components/AddLessonModal";
import LessonCard from "../Components/LessonCard";
import AppNavbar from '../Components/AppNavbar';
import {getLessons} from '../actions';
import {Jumbotron, Button } from "react-bootstrap"

export default function InsLessonPage(props) {
    const dispatch = useDispatch()
    //importing global state
    const [courseId, lessons, authObj, isNewLessonAdded,error] = useSelector((gState) => [
        gState.courseId,
        gState.lessons,
        gState.authObj,
        gState.isNewLessonAdded,
        gState.error
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
            <Jumbotron className="InsLanding-background portal-sublanding-background">
                <div className="InsLanding-content homepage-content">
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
            <LessonCard lessons={lessons.data} />
        </div>
    )
}
