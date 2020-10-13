import React, {useEffect} from 'react'
import {Jumbotron, Button} from "react-bootstrap"
import { useHistory } from 'react-router-dom';
import AppNavbar from "../Components/AppNavbar";
import InstructorTable from "../Components/AdminInstructorTable";
import "../instructor.css";
import { getAllInstructors, deleteInstructor, activateInstructor, deactivateInstructor } from '../actions'
import { useDispatch, useSelector } from 'react-redux';

export default function AdminInstructorList() {
    const history = useHistory()


    const dispatch = useDispatch()
  
    const [allInstructors, authObj] = useSelector((gState) => [
      gState.allInstructors,
      gState.authObj
    ])
  
    useEffect(() => {
        console.log("auth", authObj)
      dispatch(getAllInstructors(authObj.accessToken))
    }, [])

    const handleDelete = (id) => (e) => {
        e.preventDefault()
        dispatch(deleteInstructor(authObj.accessToken, id))
    }

    const handleActivate = (id) => (e) => {
        e.preventDefault()
        dispatch(activateInstructor(authObj.accessToken, id))
    }

    const handleDeactivate = (id) => (e) => {
        e.preventDefault()
        dispatch(deactivateInstructor(authObj.accessToken, id))
    }
    
    
    return (
        <React.Fragment> 
            <AppNavbar />
            <Jumbotron className="InsLanding-background">
                <div className="InsLanding-content homepage-content">
                    <h1 className="">POD | Instructor View</h1>
                    <p className="btngroup">
                        <Button className="InsBtn Dashboard primary-button" onClick={() => {history.push(`/admin`)}}>DASHBOARD</Button>{' '}
                    </p>
                </div>
            </Jumbotron>
            <InstructorTable allInstructors={allInstructors.data} handleDelete={handleDelete} handleActivate={handleActivate} handleDeactivate={handleDeactivate} />
        </React.Fragment>
    )
}