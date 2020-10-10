import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import AppNavbar from "../Components/AppNavbar";
import { parse } from "query-string";
import { validateResetPassToken } from "../actions";
import "../instructor.css";


/**
 * HELPER FUNCTIONS
 */
function parseToken(queryToken) {
    
    if(!queryToken || queryToken === "" || queryToken === undefined || queryToken === null){
        //redirection to 404
        return "404";
    }
    else if(queryToken && queryToken !== ""){
        const _token = parse(queryToken).token || "";
        //check if token is empty
        if(_token !== ""){
            //dispatch validation action
            return _token;
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
    const dispatch = useDispatch();
    const [isValidPassResTok, isValidatingPassResTok, resPassUid] = useSelector((gState) => [
        gState.isValidPassResTok,
        gState.isValidatingPassResTok,
        gState.resPassUid
    ]);

    useEffect(() => {
        const _token = parseToken(props.location.search);
        //checking for token
        switch (_token) {
            case "404":
                console.log("token error");
                break;
        
            default:
                // dispatch(validateResetPassToken(".eyJpZCI6MywiaWF0IjoxNjAyMTI5NzEwLCJleHAiOjE2MDIyMTYxMTB9.ZM6i2yEJPR3w2fvcv6LhVQLOXOWhF9tfhNS06A4RHWE"));
                dispatch(validateResetPassToken(_token));
                break;
        }
    }, []);
    
    const returnFrag = () => {
        //conditional rendering
        if (isValidPassResTok){
           return (
                <h1 className="">Reset Password Form</h1>
           ) 
        }
        else if(!isValidPassResTok && isValidatingPassResTok){
            return (
                <h1 className="">Validating...</h1>
            ) 
        }
        else if(!isValidPassResTok && !isValidatingPassResTok){
            return (
                <h1 className="">Access Denied.</h1>
            ) 
        }
        else {
            return (
                <h1 className="">Access Denied.</h1>
            ) 
        }
    }
        
    return (
        <React.Fragment> 
            <AppNavbar />
            { returnFrag() }
        </React.Fragment>
    )
}
