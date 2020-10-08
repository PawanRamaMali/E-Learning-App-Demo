import React, {useState, useEffect} from 'react'
import {Jumbotron, Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import AppNavbar from "../Components/AppNavbar";
import StudentTable from "../Components/AdminStudentTable";
import { getAllStudents } from '../actions'
import "../instructor.css";

export default function AdminStudentList() {
    const history = useHistory()

    const dispatch = useDispatch()
  
    const [allStudents, error, authObj] = useSelector((gState) => [
      gState.allStudents,
      gState.error,
      gState.authObj
    ])
  
    useEffect(() => {
      dispatch(getAllStudents(authObj.accessToken))
    }, [])
  
    // console.log(allStudents)
    // console.log(allStudents.data)

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
            <StudentTable allStudents={allStudents.data} />
        </React.Fragment>
        
        


    )
}