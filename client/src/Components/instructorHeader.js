import React from 'react'
import {useState, useEffect} from "react"
import Navbar from "react-bootstrap/Navbar"


export default function InstructorHeader() {
    const [user, setUser] = useState({
        name: "",
        isloggedIn: false
    })
   


    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">POD E-LEARNING</Navbar.Brand>
            <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}
