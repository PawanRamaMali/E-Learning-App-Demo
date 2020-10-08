import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  LOGOUT_REQUEST, LOGOUT_SUCCESS,LOGOUT_FAILURE,
  ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILURE,
  ADD_COURSE_REQUEST, ADD_COURSE_SUCCESS, ADD_COURSE_FAILURE,
  GET_COURSES_REQUEST, GET_COURSES_SUCCESS, GET_COURSES_FAILURE,
  GET_LESSONS_REQUEST, GET_LESSONS_SUCCESS, GET_LESSONS_FAILURE,
  GET_ROSTER_REQUEST, GET_ROSTER_SUCCESS, GET_ROSTER_FAILURE,
  SET_COURSE_IDREQ , SET_COURSE_IDSUCCESS , SET_COURSE_IDFAIL,
  GET_ALL_INSTRUCTORS_REQUEST, GET_ALL_INSTRUCTORS_SUCCESS, GET_ALL_INSTRUCTORS_FAILURE,
  GET_ALL_STUDENTS_REQUEST, GET_ALL_STUDENTS_SUCCESS, GET_ALL_STUDENTS_FAILURE,
  DELETE_INSTRUCTOR_REQUEST, DELETE_INSTRUCTOR_SUCCESS, DELETE_INSTRUCTOR_FAILURE,
  DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS, DELETE_STUDENT_FAILURE
} from "./constants";
import { validateSession, getSessionAuthObj } from "./utils/sessions";

export const initialState = {
  isFetchingAuth: false,
  isAuthenticatedUser: validateSession(),
  isLoggingOut: false,
  isLoggedOutSuccess: false,
  authObj: getSessionAuthObj(),
  isNewCourseAdded: false,
  courseObj: {},
  courses: [],
  courseId: "",
  allInstructors: [],
  allStudents: [],
  lessons: [],
  isAddingNewUser: false,
  isNewUserAdded: false,
  stuObj: {},
  stuRoster: [],
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { 
        ...state, 
        isFetchingAuth: action.isFetchingAuth, 
        isAuthenticatedUser: action.isAuthenticatedUser 
      };
    case LOGIN_SUCCESS:
      return { 
        ...state, 
        isFetchingAuth: action.isFetchingAuth, 
        isAuthenticatedUser: action.isAuthenticatedUser, 
        authObj: action.payload,
        error: ""
      };
    case LOGIN_FAILURE:
      return { 
        ...state, 
        isFetchingAuth: action.isFetchingAuth, 
        isAuthenticatedUser: action.isAuthenticatedUser, 
        authObj: {},
        error: action.payload
      };

    case ADD_COURSE_REQUEST:
        return {...state, isNewCourseAdded: false} 
    case ADD_COURSE_SUCCESS:
        return { 
          ...state, 
          isNewCourseAdded: true,
          courseObj: action.payload,
          error: ""
        };
    case ADD_COURSE_FAILURE:
      return { 
        ...state, 
        isNewCourseAdded: false,
        courseObj: {},
        error: action.payload
      };

    case GET_COURSES_REQUEST:
        return {...state, courses: [], error: null}
    case GET_COURSES_SUCCESS:
        return {...state, courses: action.payload, error: null}
    case GET_COURSES_FAILURE:
        return {...state, error: action.payload}

    case GET_LESSONS_REQUEST:
          return {...state, lessons: [], error: null}
    case GET_LESSONS_SUCCESS:
          return {...state, lessons: action.payload, error: null}
    case GET_LESSONS_FAILURE:
          return {...state, error: action.payload}
    
    case SET_COURSE_IDREQ:
          return {...state, courseId: "", error: null}
    case SET_COURSE_IDSUCCESS:
          return {...state, courseId: action.payload, error: null}
    case SET_COURSE_IDFAIL:
          return {...state, error: action.payload}

    case GET_ALL_INSTRUCTORS_REQUEST:
          return {...state, allInstructors: [], error: null}
    case GET_ALL_INSTRUCTORS_SUCCESS:
          return {...state, allInstructors: action.payload, error: null}
    case GET_ALL_INSTRUCTORS_FAILURE:
          return {...state, error: action.payload}

    case GET_ALL_STUDENTS_REQUEST:
          return {...state, allStudents: [], error: null}
    case GET_ALL_STUDENTS_SUCCESS:
          return {...state, allStudents: action.payload, error: null}
    case GET_ALL_STUDENTS_FAILURE:
          return {...state, error: action.payload}

    case GET_ROSTER_REQUEST:
            return {...state, stuRoster: [], error: null}
    case GET_ROSTER_SUCCESS:
            return {...state, stuRoster: action.payload, error: null}
    case GET_ROSTER_FAILURE:
            return {...state, error: action.payload}

    case LOGOUT_REQUEST:
      return { 
        ...state, 
        isLoggingOut: true
      };
    case LOGOUT_SUCCESS:
      return { 
        ...state, 
        isLoggingOut: false,
        isLoggedOutSuccess: true,
        isAuthenticatedUser: false,
        authObj: {},
        courses: [],
        error: "",
      };
    case LOGOUT_FAILURE:
      //force state reset
      return {
        ...state, 
        isLoggingOut: false,
        isLoggedOutSuccess: false,
        isAuthenticatedUser: false,
        authObj: {},
        courses: [],
        error: action.payload,
      };

    case ADD_STUDENT_REQUEST:
      return {
        ...state,
        isNewUserAdded: false 
      }
    case ADD_STUDENT_SUCCESS:
      return { 
        ...state, 
        isNewUserAdded: true,
        stuObj: action.payload,
        error: ""
      };
    case ADD_STUDENT_FAILURE:
      return { 
        ...state, 
        isNewUserAdded: false,
        stuObj: {},
        error: action.payload
      };

    case DELETE_INSTRUCTOR_REQUEST:
        // return {...state, allInstructors: [], error: null}
        const allInstructorArray = Object.keys(allInstructors)
        
        return {
          ...state,
          allInstructors: state.allInstructors.map(instructor =>
            instructor.id === action.id
              ? { ...instructor, deleting: true }
              : instructor
            )
        }
    case DELETE_INSTRUCTOR_SUCCESS:
      return {
        allInstructors: state.allInstructors.filter(instructor => instructor.id !== action.id)
      }
        // return {...state, allInstructors: action.payload, error: null}
    case DELETE_INSTRUCTOR_FAILURE:
      return {
        ...state,
        allInstructors: state.allInstructors.map(instructor => { 
          if (instructor.id === action.id) {
            const { deleting, ...instructorCopy } = instructor;
            return { ...instructorCopy, deleteError: action.error }
          }
          return instructor
        })
      }
        // return {...state, error: action.payload}

    case DELETE_STUDENT_REQUEST:
        // return {...state, allStudents: [], error: null}
        return {
          ...state,
          allStudents: state.allStudents.map(student => 
            student.id === action.id
              ? { ...student, deleting: true }
              : student
            )
        }
    case DELETE_STUDENT_SUCCESS:
        // return {...state, allStudents: action.payload, error: null}
        return {
          allStudents: state.allStudents.filter(student => student.id !== action.id)
        }
    case DELETE_STUDENT_FAILURE:
        // return {...state, error: action.payload}
        return {
          ...state,
          allStudents: state.allStudents.map(student => { 
            if (student.id === action.id) {
              const { deleting, ...studentCopy } = student;
              return { ...studentCopy, deleteError: action.error }
            }
            return student
          })
        }
    default:
      return state;
  }
};