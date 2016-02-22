import {combineReducers, applyMiddleware, createStore} from 'redux';
import {GET_POSTS} from './actions';
import promiseMiddleware from 'redux-promise';

// ------------------------------------------------------------
// Reducers

function posts(posts = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      return {...posts, ...action.payload};
    default:
      return posts;
  }
}

// ------------------------------------------------------------
// Middleware

const logMiddleware = () => next => action => {
  // console.log(action);
  next(action);
};

// ------------------------------------------------------------
// createStore

export default function(data) {
  return createStore(
    combineReducers({posts}),
    data,
    applyMiddleware(
      promiseMiddleware,
      logMiddleware,
    ),
  );
}
