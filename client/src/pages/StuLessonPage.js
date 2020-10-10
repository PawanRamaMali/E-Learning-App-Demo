import React from 'react'
import LessonCard from "../Components/LessonCard"
import AppNavbar from '../Components/AppNavbar';
import { useEffect } from "react";
import { getStuLessons } from '../actions';
import Player from "../Components/Player"
import "../App.css"

import { useDispatch, useSelector } from 'react-redux';

export default function StuLessonPage() {
    const dispatch = useDispatch()
    const [courseId, lessons, authObj, url] = useSelector((gState) => [
        gState.courseId,
        gState.lessons,
        gState.authObj,
        gState.url

      ]);
    console.log(courseId)
    
    useEffect(() => {
        dispatch(getStuLessons(authObj.accessToken, courseId));
    },[courseId , authObj.accessToken]);
    
  
    return (
        <div>
            <AppNavbar />
            {
                url ? (
                    <div className="container video">
                        <div><LessonCard lessons={lessons.data} /> </div><div><Player/></div>
                    </div> 
                ) : (
                    <div className="noVideo"><LessonCard lessons={lessons.data} /></div>
                )
            }
            

        </div>
    )
}
