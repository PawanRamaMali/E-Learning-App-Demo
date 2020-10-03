import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT_REQUEST, 
  LOGOUT_SUCCESS, 
  LOGOUT_FAILURE,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE 
} from "./constants";
import { validateSession, getSessionAuthObj } from "./utils/sessions";

export const initialState = {
  isFetchingAuth: false,
  isAuthenticatedUser: validateSession(),
  isLoggingOut: false,
  isLoggedOutSuccess: false,
  authObj: getSessionAuthObj(),
  courses: [],
  isAddingNewUser: false,
  isNewUserAdded: false,
  stuObj: {},
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
    default:
      return state;
  }
};