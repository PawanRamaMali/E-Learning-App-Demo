import React from 'react'
import LessonCard from "../Components/LessonCard"
import AppNavbar from '../Components/AppNavbar';
import { useEffect } from "react";
import { getLessons } from '../actions';

import { useDispatch, useSelector } from 'react-redux';

export default function InsLessonPage() {
    const dispatch = useDispatch()
    const [courseId, lessons, error, authObj] = useSelector((gState) => [
        gState.courseId,
        gState.lessons,
        gState.error,
        gState.authObj

      ]);

    console.log("I got the " + courseId)

    useEffect(() => {
        dispatch(getLessons(authObj.accessToken,courseId));
    },[courseId]);

  
    return (
        <div>
            <AppNavbar />
        </div>
    )
}
