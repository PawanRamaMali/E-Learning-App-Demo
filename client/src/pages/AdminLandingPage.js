import React, {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import {Jumbotron, Button } from "react-bootstrap"
import AppNavbar from "../Components/AppNavbar";
import { useHistory } from "react-router-dom";
import "../instructor.css";


function AdminLandingPage() {

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
                case "ADMIN":
                    routePath = "/admin/view/instructors";
                    break;
                default:
                    routePath = "/";
                    break;
            }
        }
        history.push(routePath);
    }

    //redirecting function
    const redirectRouter2 = (routePath) => {
        if(isAuthenticatedUser) {
            switch (authObj.role.toUpperCase()) {
                case "ADMIN":
                    routePath = "/admin/view/students";
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
            <Jumbotron className="InsLanding-background homepage-background">
            <div className="InsLanding-content homepage-content">
                <h1 className="">POD | Admin Portal</h1>
                <p>
                    Manage Instructors and Students
                </p>
                <p className="btngroup">
                    <Button className="InsBtn AddStu primary-button" id="Ins" onClick={redirectRouter}>MANAGE INSTRUCTORS</Button>
                    <Button className="InsBtn AddCourses primary-button" id="Stu" onClick={redirectRouter2}>MANAGE STUDENTS</Button>
                </p>
            </div>
        </Jumbotron>
        </React.Fragment>

    )
}

export default AdminLandingPage