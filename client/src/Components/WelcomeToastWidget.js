import React from 'react';
import { useSelector } from "react-redux";
import { Toast } from 'react-bootstrap';
// import { useHistory } from "react-router-dom";
import "../App.css";

function WelcomeToastWidget (props) {
    //importing global state
    const [isAuthenticatedUser, isLoggedOutSuccess, authObj] = useSelector((gState) => [
        gState.isAuthenticatedUser,
        gState.isLoggedOutSuccess,
        gState.authObj,
    ]);

    return (
        < >
            <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                    position: 'absolute',
                    minHeight: '100px',
                    minWidth: '250px',
                    top: 0,
                    right: 0
                }}
                >
                    <Toast
                        style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: '#2ba6cb'
                        }} 
                    >
                        <Toast.Body>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">Welcome, {authObj.fname}!</strong>
                        </Toast.Body>
                    </Toast>
            </div>
        </>
    ) 
};

export default WelcomeToastWidget;