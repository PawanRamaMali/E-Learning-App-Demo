//importing LOGIN constants
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./constants";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "./constants";
import { ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILURE } from "./constants";
import { createSession, destroySession, validateSession } from "./utils/sessions";
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

const logoutSuccess = () => ({
  type:    LOGOUT_SUCCESS,
  isAuthenticatedUser: false,
});

const logoutFail = (error) => ({
  type:    LOGOUT_FAILURE,
  isAuthenticatedUser: false,
  payload: error,
});

//action: LOGOUT_REQUEST
export const logoutAttempt = () => {
  //dispatch logout request
  return (dispatch, getState) => {
    dispatch({
      type: LOGOUT_REQUEST
    });
    //call helper function to remove session from localStorage
    destroySession();
    //validate session to check if it was properly deleted
    if(!validateSession()){
      dispatch(logoutSuccess());
    }
    else{
      //__session was not removed
      dispatch(logoutFail("Error deleting existing session."))
    }
  }
}

//action: Add_STUDENT_FAILURE if backend call is unsuccessful
const addStudentFailed = (error) => ({
  type:    ADD_STUDENT_FAILURE,
  isFetchingAuth: false,
  isAuthenticatedUser: false,
  payload: error,
});

//action: ADD_STUDENT_SUCCESS once backend call is successfull
const addStudentSuccess = (stuObj) => ({
  type:    ADD_STUDENT_SUCCESS,
  isFetchingAuth: false,
  isAuthenticatedUser: true,
  payload: stuObj,
});

//action: ADD_STUDENT_REQUEST to REST API
export const addStudentAttempt = (data, accessToken) => {
  console.log("what data is this?", data, accessToken)
    //function receives credentials
    return (dispatch, getState) => {
      //dispatch action to notify client 
      //of add student request in progress
      dispatch({ 
          type: ADD_STUDENT_REQUEST, 
          isAddingNewUser: true, 
          isAuthenticatedUser: true 
        });
      //use axios to query REST api for add student.
      axios
        .post("/api/auth/signup", data, {
          headers: {
            "x-access-token": accessToken
          }
        })
        .then( (response) => {
          //if request is successful, persist a session and dispatch
          //login success action
          if(response.status === 200){
            dispatch(addStudentSuccess(response.data));
          }
        })
        .catch( (error) => {
          dispatch(addStudentFailed(error.message));
        });
      }
  }
  


