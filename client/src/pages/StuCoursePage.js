import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {Jumbotron, Button} from "react-bootstrap";
import { getStuCourses } from '../actions';
import StuCourseCard from '../Components/StuCourseCard';
import AppNavbar from '../Components/AppNavbar';


export default function InsCoursePage() {
    const dispatch = useDispatch();

    const [courses, authObj] = useSelector((gState) => [
        gState.courses,
        gState.authObj
      ]);

    useEffect(() => {
        dispatch(getStuCourses(authObj.accessToken));
    },[authObj.accessToken]);

     //useHistory hook to redirect to desired routes
    const history = useHistory();
    //redirecting function
    const redirectRouter = (routePath) => {
        history.push(routePath);
    }



    return (
        <div>
            <AppNavbar />
            <Jumbotron className="student-courses-hero portal-sublanding-background">
                <div className="student-landing-content homepage-content">
                    <h1 className="">POD | Student Courses</h1>
                    <p>
                        View and manage your Courses and Lessons!
                    </p>
                    <p className="btngroup">
                        <Button className="InsBtn Dashboard primary-button" onClick={() => redirectRouter("/student")}>VIEW DASHBOARD</Button>
                    </p>
                </div>
            </Jumbotron>
            <StuCourseCard courses={ courses } />
        </div>
    )
}

