import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {Jumbotron, Button } from "react-bootstrap";
import LessonCard from "../Components/LessonCard";
import AppNavbar from '../Components/AppNavbar';
import { getStuLessons } from '../actions';
import Player from "../Components/Player";
import "../App.css";

export default function StuLessonPage(props) {
    const dispatch = useDispatch()
    const [courseId, lessons, authObj, url] = useSelector((gState) => [
        gState.courseId,
        gState.lessons,
        gState.authObj,
        gState.url

      ]);
    // console.log(courseId)
    useEffect(() => {
        dispatch(getStuLessons(authObj.accessToken, courseId));
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
                    <h1 className="">POD | {props.courseName}Student Lessons</h1>
                    <p>
                        View and manage your {props.courseName} Lessons!
                    </p>
                    <p className="btngroup">
                        <Button className="InsBtn Dashboard primary-button" onClick={() => redirectRouter("/student/courses")}>BACK TO COURSES</Button>
                    </p>
                </div>
            </Jumbotron>
            {
                url ? (
                    <div className="video-container">
                        <div><LessonCard lessons={lessons.data} /> </div>
                        <div><Player/></div>
                    </div> 
                ) : (
                    <div className="noVideo"><LessonCard lessons={lessons.data} /></div>
                )
            }
            
        </div>
    )
}
