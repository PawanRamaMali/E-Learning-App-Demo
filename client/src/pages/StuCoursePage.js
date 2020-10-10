import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getStuCourses } from '../actions';

import StuCourseCard from '../Components/StuCourseCard';
import AppNavbar from '../Components/AppNavbar';


export default function InsCoursePage() {
    const dispatch = useDispatch();

    const [courses, authObj] = useSelector((gState) => [
        gState.courses,
        gState.authObj

      ]);

    useEffect(() => {
        dispatch(getStuCourses(authObj.accessToken));
    },[authObj.accessToken]);

    

    console.log(authObj.accessToken)
    console.log(courses)

    return (
        <div>
            <AppNavbar />
            <StuCourseCard courses={ courses } />
        </div>
    )
}

