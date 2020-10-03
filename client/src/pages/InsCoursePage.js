import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getCourses } from '../actions';

import CourseCard from '../Components/CourseCard';
import AppNavbar from '../Components/AppNavbar';


export default function InsCoursePage() {
    const dispatch = useDispatch();

    const [courses, error, authObj] = useSelector((gState) => [
        gState.courses,
        gState.error,
        gState.authObj

      ]);

    useEffect(() => {
        dispatch(getCourses(authObj.accessToken));
    },[]);

    

    console.log(authObj.accessToken)
    console.log(courses)

    return (
        <div>
            <AppNavbar />
            <CourseCard courses={ courses.data } />
        </div>
    )
}

