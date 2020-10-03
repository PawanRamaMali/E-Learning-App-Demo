import React, {useState, useEffect} from 'react'
import {Jumbotron, Button, Table } from "react-bootstrap"
import { useHistory } from 'react-router-dom';
import AppNavbar from "../Components/AppNavbar";
import InstructorTable from "../Components/AdminInstructorTable";
import "../instructor.css";

export default function AdminInstructorList() {
    const history = useHistory()
    
    return (
        <React.Fragment> 
            <AppNavbar />
            <Jumbotron className="InsLanding-background">
                <div className="InsLanding-content homepage-content">
                    <h1 className="">POD | Instructor View</h1>
                    {/* <p className="btngroup">
                        <Button className="InsBtn AddStu primary-button">ADD STUDENTS</Button>{' '}
                        <Button className="InsBtn Dashboard primary-button">VIEW DASHBOARD</Button>{' '}
                    </p> */}
                    <p className="btngroup">
                        <Button className="InsBtn Dashboard primary-button" onClick={() => {history.push(`/admin`)}}>DASHBOARD</Button>{' '}
                    </p>
                </div>
            </Jumbotron>
            <InstructorTable />
        </React.Fragment>
    )
}