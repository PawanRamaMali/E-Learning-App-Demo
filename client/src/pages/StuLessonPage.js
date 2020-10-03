import React from 'react'
import LessonCard from "../Components/LessonCard"
import AppNavbar from '../Components/AppNavbar';
import { useEffect } from "react";
import { getStuLessons } from '../actions';

import { useDispatch, useSelector } from 'react-redux';

export default function StuLessonPage() {
    const dispatch = useDispatch()
    const [courseId, lessons, error, authObj] = useSelector((gState) => [
        gState.courseId,
        gState.lessons,
        gState.error,
        gState.authObj

      ]);
    console.log(courseId)
    
    useEffect(() => {
        dispatch(getStuLessons(authObj.accessToken, courseId));
    },[courseId , authObj.accessToken]);
    
  
    return (
        <div>
            <AppNavbar />
            <LessonCard lessons={lessons.data} />
        </div>
    )
}
