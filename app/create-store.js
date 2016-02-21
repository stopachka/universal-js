import {combineReducers, createStore} from 'redux';
import POSTS from '../posts';

function posts(posts = POSTS, action) {
  return posts;
};

export default function() {
  return createStore(combineReducers({posts}));
}
