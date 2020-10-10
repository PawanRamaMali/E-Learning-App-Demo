import React, {useEffect} from 'react'
import {Jumbotron, Button} from "react-bootstrap"
import { useHistory } from 'react-router-dom';
import AppNavbar from "../Components/AppNavbar";
import InstructorTable from "../Components/AdminInstructorTable";
import "../instructor.css";
import { getAllInstructors } from '../actions'
import { useDispatch, useSelector } from 'react-redux'

export default function AdminInstructorList() {
    const history = useHistory()


    const dispatch = useDispatch()
  
    const [allInstructors, authObj] = useSelector((gState) => [
      gState.allInstructors,
      gState.error,
      gState.authObj
    ])
  
    useEffect(() => {
      dispatch(getAllInstructors(authObj.accessToken))
    }, [])
  
    // console.log(allInstructors)
    console.log(allInstructors.data)
    
    
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
            <InstructorTable allInstructors={allInstructors.data} />
        </React.Fragment>
    )
}