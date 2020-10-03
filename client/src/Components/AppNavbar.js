import React from 'react';
import {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import Navbar from "react-bootstrap/Navbar";


export default function AppNavbar() {
    const [authObj] = useSelector((gState) => [
        gState.authObj

      ]);
   
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">POD | E-LEARNING</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a href="#login">{authObj.fname}</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}
