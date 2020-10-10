import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {getCourses} from '../actions';
import {Jumbotron, Button} from "react-bootstrap";
import CourseCard from '../Components/CourseCard';
import AppNavbar from '../Components/AppNavbar';
import AddCourseModal from '../Components/AddCourseModal';

export default function InsCoursePage(props) {
    const dispatch = useDispatch();
    //importing global state
    const [authObj, courses] = useSelector((gState) => [
        gState.authObj, 
        gState.courses 
    ]);

    const [showCourseModal, setShowCourseModal] = useState(false);

    useEffect(() => {
        dispatch(getCourses(authObj.accessToken));
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
            <Jumbotron className="ins-courses-hero portal-sublanding-background">
                <div className="instructor-landing-content homepage-content">
                    <h1 className="">POD | Instructor Courses</h1>
                    <p>
                        View and manage your Courses and Lessons!
                    </p>
                    <p className="btngroup">
                        <Button className="InsBtn primary-button" onClick={() => {setShowCourseModal(true)}}>ADD COURSE</Button>
                        <Button className="InsBtn Dashboard primary-button" onClick={() => redirectRouter("/instructor")}>VIEW DASHBOARD</Button>
                        <AddCourseModal show={showCourseModal} onHide={() => setShowCourseModal(false)} />
                    </p>
                </div>
            </Jumbotron>
            <CourseCard courses={ courses.data } />
        </div>
    )
}

