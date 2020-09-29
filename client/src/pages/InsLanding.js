import React, {useState, useEffect} from 'react'
import {Jumbotron, Button } from "react-bootstrap"
import AppNavbar from "../Components/AppNavbar";
import "../instructor.css";


export default function InsLanding() {
    const [stuList, setStudent] = useState();
    const [coursesList, setCourses] = useState(false);


    return (

        
        <React.Fragment> 
            <AppNavbar />
            <Jumbotron className="InsLanding-background homepage-background">
            <div className="InsLanding-content homepage-content">
                <h1 className="">POD | Instructor Portal</h1>
                <p>
                    Manage Students, Courses, and Content all in one place!
                </p>
                <p className="btngroup">
                    <Button className="InsBtn AddStu primary-button">ADD STUDENT</Button>{' '}
                    <Button className="InsBtn AddCourses primary-button">ADD COURSES</Button>{' '}
                    <Button className="InsBtn Dashboard primary-button">VIEW DASHBOARD</Button>{' '}
                </p>
            </div>
        </Jumbotron>
        </React.Fragment>
        
        


    )
}
