import React from 'react'
import LessonCard from "../Components/LessonCard"
import { useDispatch, useSelector } from 'react-redux';

export default function InsLessonPage() {
    const [courses, lessons, error, authObj] = useSelector((gState) => [
        gState.courses,
        gState.lessons,
        gState.error,
        gState.authObj

      ]);
    console.log(authObj.id)

    return (
        <div>
            
        </div>
    )
}
