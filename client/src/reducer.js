import { ADD_USER, DELETE_USER } from './constants';

export const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: state.users.concat(action.payload) };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};