import React from 'react'
import {useState, useEffect} from "react"
import {Jumbotron, Button } from "react-bootstrap"
import InstructorHeader from "../Components/instructorHeader";
import "../instructor.css"


export default function InsLanding() {
    const [stuList, setStudent] = useState();
    const [coursesList, setCourses] = useState(false);


    return (

        
        <React.Fragment> 
            <InstructorHeader />
            <Jumbotron className="InsLanding-background">
            <div className="InsLanding-content">
                <h1 className="">POD | E-Learning</h1>
                <p>
                    Feeding the minds one video at a time.
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
