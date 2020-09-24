import React, { Component } from "react";
import { Route } from "react-router-dom";

//Protected Route component, prevents not-logged users to 
//visit sensitive app sections
//from react-router documentation:
const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        //returns a Route component from react-router
        //which renders a component specified in the render prop
        <Route { ...rest } render={
            props => <Component { ...rest } { ...props } />    
        } />
    )
}

export default ProtectedRoute;