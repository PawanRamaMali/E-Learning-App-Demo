import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getCourses } from '../actions';


export default function InsCoursePage() {
    const dispatch = useDispatch();

    const [courses, error, authObj] = useSelector((gState) => [
        gState.courses,
        gState.error,
       gState.authObj

      ]);

    useEffect(() => {
        dispatch(getCourses(authObj.accessToken));
    },[authObj]);

    console.log(authObj.accessToken)
    console.log(courses)

    return (
        <div>
            
        </div>
    )
}

