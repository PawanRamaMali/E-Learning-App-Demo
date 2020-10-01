// import { type } from "jquery";
// import { ADD_USER, DELETE_USER } from './constants';

// export const addUser = (user) => ({
//   type: ADD_USER,
//   payload: user,
// });

// export const deleteUser = (id) => ({
//   type: DELETE_USER,
//   payload: id,
// });

//importing LOGIN constants
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./constants";
import { GET_COURSES_REQUEST, GET_COURSES_SUCCESS, GET_COURSES_FAILURE } from "./constants"
import { GET_LESSONS_REQUEST, GET_LESSONS_SUCCESS, GET_LESSONS_FAILURE } from "./constants"
import { SET_COURSE_IDREQ , SET_COURSE_IDSUCCESS , SET_COURSE_IDFAIL } from "./constants"
import { createSession } from "./utils/sessions";
import axios from "axios";

//action: LOGIN_SUCCESS once backend call is successfull
const loginSuccess = (authObj) => ({
  type:    LOGIN_SUCCESS,
  isFetchingAuth: false,
  isAuthenticatedUser: true,
  payload: authObj,
});

//action: LOGIN_FAILURE if backend call is unsuccessful
const loginFailed = (error) => ({
  type:    LOGIN_FAILURE,
  isFetchingAuth: false,
  isAuthenticatedUser: false,
  payload: error,
});

//action: LOGIN_REQUEST  to backend REST api
export const loginAttempt = (creds) => {
  //function receives credentials
  return (dispatch, getState) => {
    //dispatch action to notify client
    //of login request in progress
    dispatch({
        type: LOGIN_REQUEST,
        isFetchingAuth: true,
        isAuthenticatedUser: false
      });
      console.log("creds in action.js", creds);
    //use axios to query REST api for login.
    axios
      .post("/api/auth/signin", creds)
      .then( (response) => {
        //if request is successful, persist a session and dispatch
        //login success action
        if(response.status === 200){
          createSession(response.data);
          dispatch(loginSuccess(response.data));
        }
      })
      .catch( (error) => {
        dispatch(loginFailed(error.message));
      });
  }
}

///Action to load courses
const getCourseSuccess = (courses) => ({
  type: GET_COURSES_SUCCESS,
  payload: courses
})
//When Request from API fails
const getCourseFailure = (error) => ({
  type: GET_COURSES_FAILURE,
  payload: error,
})


//courses Api request for instructor
export const getCourses = (token) => {
  console.log(token)
  return (dispatch, getState) => {
    dispatch({type: GET_COURSES_REQUEST});
    axios
      .get("/api/user/instructor/courses", {
        headers: {
          'x-access-token': token
        }
      })
      .then((response) => {
        dispatch(getCourseSuccess(response.data))
        console.log(typeof(response.data))
      })
      .catch((error) => {
        dispatch(getCourseFailure(error.message))
      })
  }
}


//Get Courses Student API request
export const getStuCourses = () => {
  return (dispatch, getState) => {
    dispatch({type: GET_COURSES_REQUEST});
    axios
      .get("/api/user/student/courses")
      .then((response) => {
        dispatch(getCourseSuccess(response.data))

      })
      .catch((error) => {
        dispatch(getCourseFailure(error.message))
      })
  }
}


//Actions to get lessons for the instructors page
///Action to load courses
const getLessonsSuccess = (lessons) => ({
  type: GET_LESSONS_SUCCESS,
  payload: lessons
})
//When Request from API fails
const getLessonsFailure = (error) => ({
  type: GET_LESSONS_FAILURE,
  payload: error,
})


//courses Api request for instructor
export const getLessons = (token, id) => {
  console.log(token, id)
  return (dispatch, getState) => {
    dispatch({type: GET_LESSONS_REQUEST});
    axios
      .get("/api/user/instructor/lessons/" + id , {
        headers: {
          'x-access-token': token
        }
      })
      .then((response) => {
        
        dispatch(getLessonsSuccess(response.data))
        
      })
      .catch((error) => {
        dispatch(getLessonsFailure(error.message))
      })
  }
}


const setCourseIdSuccess = (id) => {
  console.log ("i am id in actions/setCourseIdSelect", id);
return {
  type: SET_COURSE_IDSUCCESS,
  payload: id
}
}

//When Request from API fails
const setCourseIdFailure = (error) => ({
  type: SET_COURSE_IDFAIL,
  payload: error,
})

export const setCourseId = (id) => {
  return (dispatch, getState) => {
    if(id){
      console.log("I am" + id)
      // dispatch({type: SET_COURSE_IDREQ});
      dispatch(setCourseIdSuccess(id))

    } else {
      dispatch(setCourseIdFailure())
    }

  }
}