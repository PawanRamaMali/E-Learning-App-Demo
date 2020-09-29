import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function InsCoursePage() {
    const dispatch = useDispatch();

    const [courses, error] = useSelector((gState) => [
       gState.courses
      ]);
    


    return (
        <div>
            
        </div>
    )
}

