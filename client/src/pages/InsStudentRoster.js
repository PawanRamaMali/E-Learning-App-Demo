import React, {useState, useEffect} from 'react'
import {Jumbotron, Button, Table } from "react-bootstrap"
import AppNavbar from "../Components/AppNavbar";
import StudentRosterTable from "../Components/StudentRosterTable";
import "../instructor.css";

export default function InsStudentRoster() {

    return (
        <React.Fragment> 
            <AppNavbar />
            <Jumbotron className="InsLanding-background">
                <div className="InsLanding-content homepage-content">
                    <h1 className="">POD | Student Roster</h1>
                    <p>
                        View and manage your Student Roster globally and by course!
                    </p>
                    <p className="btngroup">
                        <Button className="InsBtn AddStu primary-button">ADD STUDENTS</Button>{' '}
                        <Button className="InsBtn Dashboard primary-button">VIEW DASHBOARD</Button>{' '}
                    </p>
                </div>
            </Jumbotron>
            <StudentRosterTable />
        </React.Fragment>
        
        


    )
}