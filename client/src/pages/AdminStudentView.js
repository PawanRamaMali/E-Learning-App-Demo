import React, {useState, useEffect} from 'react'
import {Jumbotron, Button, Table } from "react-bootstrap"
import { useHistory } from 'react-router-dom';
import AppNavbar from "../Components/AppNavbar";
import StudentTable from "../Components/AdminStudentTable";
import "../instructor.css";

export default function AdminStudentList() {
    const history = useHistory()

    return (
        <React.Fragment> 
            <AppNavbar />
            <Jumbotron className="InsLanding-background">
                <div className="InsLanding-content homepage-content">
                    <h1 className="">POD | Student View</h1>
                    <p className="btngroup">
                        <Button className="InsBtn Dashboard primary-button" onClick={() => {history.push(`/admin`)}}>DASHBOARD</Button>{' '}
                    </p>
                </div>
            </Jumbotron>
            <StudentTable />
        </React.Fragment>
        
        


    )
}