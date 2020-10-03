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
    let routePath = "";

    //redirecting function
    const redirectRouter = (routePath) => {
        if(isAuthenticatedUser) {
            switch (authObj.role.toUpperCase()) {
                case "INSTRUCTOR":
                    routePath = "/instructor/student-roster";
                    break;
                case "INSTRUCTOR":
                    routePath = "/instructor/courses";
                    break;
                case "STUDENT":
                    routePath = "/student/courses";
                    break;
                default:
                    routePath = "/";
                    break;
            }
        }
        history.push(routePath);
    }

    return (
        <React.Fragment> 
            <AppNavbar />
            {authObj.role === "INSTRUCTOR" ?(
                <Jumbotron className="InsLanding-background homepage-background">
                <div className="InsLanding-content homepage-content">
                    <h1 className="">POD | Instructor Portal</h1>
                    <p>
                        Manage Students, Courses, and Content all in one place!
                    </p>
                    <p className="btngroup">
                        <Button className="InsBtn AddStu primary-button" onClick={redirectRouter}>MANAGE STUDENTS</Button>
                        <Button className="InsBtn AddCourses primary-button" onClick={redirectRouter}>MANAGE COURSES</Button>
                        {/* <Button className="InsBtn Dashboard primary-button" onClick={handleInstructorRoutes}>MANAGE CONTENT</Button> */}
                    </p>
                </div>
            </Jumbotron>

            ) :(
                <Jumbotron className="InsLanding-background homepage-background">
                <div className="InsLanding-content homepage-content">
                <h1 className="">POD | Student Portal</h1>
                <p>
                    All your Courses in one place!
                </p>
                <p className="btngroup">
                    <Button className="MyCourses" onClick={redirectRouter}>My Courses</Button>
                    {/* <Button className="InsBtn AddCourses primary-button" onClick={redirectRouter}>MANAGE COURSES</Button> */}
                    {/* <Button className="InsBtn Dashboard primary-button" onClick={handleInstructorRoutes}>MANAGE CONTENT</Button> */}
                </p>
            </div>
        </Jumbotron>
            )}
            
        </React.Fragment>
        
        


    )
}
