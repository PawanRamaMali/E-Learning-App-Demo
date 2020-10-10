import React from "react";
import { Route, Redirect } from "react-router-dom";

//Protected Route component, prevents not-logged users to 
//visit sensitive app sections
//from react-router documentation:
const ProtectedRoute = ({ component: Component, path, auth, ...rest }) => {
    return (
        //returns a Route component from react-router
        //which renders a component specified in the render prop
        <Route { ...rest } render={
            // props => <Component { ...rest } { ...props } /> 
            props => {
                if(Object.keys(auth).length !== 0) {
                    //user is logged in
                    //need to verify role
                    switch (path) {
                        case "/instructor":
                        case "/instructor/courses":
                        case "/instructor/courses/lessons":
                            if(auth.role.toUpperCase() === "INSTRUCTOR"){
                                return <Component {...rest} {...props} />
                            }
                            break;
                        case "/instructor/student-roster":
                            if(auth.role.toUpperCase() === "INSTRUCTOR"){
                                return <Component {...rest} {...props} />
                            }
                            break;
                        case "/instructor/courses/:id/roster":
                            if(auth.role.toUpperCase() === "INSTRUCTOR"){
                                return <Component {...rest} {...props} />
                            }
                            break;
                        case "/admin":
                        case "/admin/view/students":
                            if(auth.role.toUpperCase() === "ADMIN"){
                                return <Component {...rest} {...props} />
                            }
                            break;
                        case "/admin/view/instructors":
                            if(auth.role.toUpperCase() === "ADMIN"){
                                return <Component {...rest} {...props} />
                            }
                            break;
                    
                        default:
                            break;
                    }
                }
                else{
                    //redirect to /unauthorized
                    return <Redirect to={
                        {
                            pathname: "/unauthorized",
                            state: {
                                from: props.location
                            }
                        }
                    }
                    />
                }
            }
        } />
    )
}

export default ProtectedRoute;