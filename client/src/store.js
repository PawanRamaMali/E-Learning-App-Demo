import { createStore, applyMiddleware, compose } from 'redux';
import reducer, { initialState } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(thunk), composeWithDevTools())
);

export default store