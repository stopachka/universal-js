import {combineReducers, applyMiddleware, createStore} from 'redux';

// ------------------------------------------------------------
// Reducers

import POSTS from '../posts';

function posts(posts = POSTS, action) {
  return posts;
};

// ------------------------------------------------------------
// Middleware

const promiseMiddleware = () => next => action => {
  console.log('PROMISE');
};

const logMiddleware = () => next => action => {
  console.log(action);
};

// ------------------------------------------------------------
// createStore

export default function() {
  return createStore(
    combineReducers({posts}),
    applyMiddleware(
      promiseMiddleware,
      logMiddleware,
    ),
  );
}
