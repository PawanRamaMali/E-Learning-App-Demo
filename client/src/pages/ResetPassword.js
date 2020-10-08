import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import AppNavbar from "../Components/AppNavbar";
import { parse } from "query-string";
import "../instructor.css";


/**
 * HELPER FUNCTIONS
 */
function parseAndValidateToken(queryToken) {
    const dispatch = useDispatch();
    if(!queryToken || queryToken === "" || queryToken === undefined || queryToken === null){
        //redirection to 404
        return "404";
    }
    else if(queryToken && queryToken !== ""){
        const _token = parse(queryToken).token || "";
        //check if token is empty
        if(_token !== ""){
            //dispatch validation action

        }
        else{
            //redirect to 404
            return "404";
        }
    }
    else{
        return "404";
    }
}


export default function ResetPassword(props) {
    // action plan
    // 1. check props.location.search is not empty
    //  if empty, redirect to 404 or display alert
    // 2. if props.location.search exist
    //  parse it out
    //  verify token exist
    //      if no token, redirect to 404
    // 3. if token exist, validate token
    // if valid token, display reset-password form
    console.log("query string", props.location)

    
    
    return (
        <React.Fragment> 
            <AppNavbar />
            <h1 className="">Reset Password</h1>
        </React.Fragment>
    )
}
