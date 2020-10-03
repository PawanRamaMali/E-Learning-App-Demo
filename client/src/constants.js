//defining LOGIN actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

//defining LOGOUT actions
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

//defining get Courses Actions
export const GET_COURSES_REQUEST = 'GET_COURSES_REQUEST';
export const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';
export const GET_COURSES_FAILURE = 'GET_COURSES_FAILURE';


//Defining Action to pass course id from courseCard to global state
export const SET_COURSE_IDSUCCESS = 'SET_COURSE_IDSUCCESS';
export const SET_COURSE_IDFAIL = 'SET_COURSE_IDFAIL';
export const SET_COURSE_IDREQ = 'SET_COURSE_IDREQ'



//defining get lessons Actions
export const GET_LESSONS_REQUEST = 'GET_LESSONS_REQUEST';
export const GET_LESSONS_SUCCESS = 'GET_LESSONS_SUCCESS';
export const GET_LESSONS_FAILURE = 'GET_LESSONS_FAILURE';

//defining get  instructors Actions for admin
export const GET_ALL_INSTRUCTORS_REQUEST = 'GET_ALL_INSTRUCTORS_REQUEST';
export const GET_ALL_INSTRUCTORS_SUCCESS = 'GET_ALL_INSTRUCTORS_SUCCESS';
export const GET_ALL_INSTRUCTORS_FAILURE = 'GET_ALL_INSTRUCTORS_FAILURE';

//defining get students Actions for admin
export const GET_ALL_STUDENTS_REQUEST = 'GET_ALL_STUDENTS_REQUEST';
export const GET_ALL_STUDENTS_SUCCESS = 'GET_ALL_STUDENTS_SUCCESS';
export const GET_ALL_STUDENTS_FAILURE = 'GET_ALL_STUDENTS_FAILURE';