import React, {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import {Jumbotron, Button } from "react-bootstrap"
import AppNavbar from "../Components/AppNavbar";
import { useHistory } from "react-router-dom";
import "../instructor.css";

export default function InsLanding() {
    const [stuList, setStudent] = useState();
    const [coursesList, setCourses] = useState(false);

    const [isAuthenticatedUser, authObj] = useSelector((gState) => [
        gState.isAuthenticatedUser,
        gState.authObj,
    ]);

    //useHistory hook to redirect to desired routes
    const history = useHistory();

    //redirecting function
    const redirectRouter = (routePath) => {
        history.push(routePath);
    }

    return (
        <React.Fragment> 
            <AppNavbar />
            {authObj.role === "INSTRUCTOR" ?(
                <Jumbotron tag="div" className="instructor-landing-hero homepage-background">
                <div className="instructor-landing-content homepage-content">
                    <h1 tag="div" className="">POD | Instructor Portal</h1>
                    <p tag="div">
                        Manage Students, Courses, and Content all in one place!
                    </p>
                    <p tag="div" className="btngroup">
                        <Button className="InsBtn AddStu primary-button" onClick={() => redirectRouter("/instructor/student-roster")}>MANAGE STUDENTS</Button>
                        <Button className="InsBtn AddCourses primary-button" onClick={() => redirectRouter("/instructor/courses")}>MANAGE COURSES</Button>
                        {/* <Button className="InsBtn Dashboard primary-button" onClick={handleInstructorRoutes}>MANAGE CONTENT</Button> */}
                    </p>
                </div>
            </Jumbotron>

            ) :(
                <Jumbotron tag="div" className="student-landing-hero homepage-background">
                <div className="student-landing-content homepage-content">
                <h1 className="">POD | Student Portal</h1>
                <p tag="div">
                    All your Courses in one place!
                </p>
                <p tag="div" className="btngroup">
                    <Button className="primary-button MyCourses" onClick={() => redirectRouter("/student/courses")}>My Courses</Button>
                    {/* <Button className="InsBtn AddCourses primary-button" onClick={redirectRouter}>MANAGE COURSES</Button> */}
                    {/* <Button className="InsBtn Dashboard primary-button" onClick={handleInstructorRoutes}>MANAGE CONTENT</Button> */}
                </p>
            </div>
        </Jumbotron>
            )}
            
        </React.Fragment>
        
    )
}
