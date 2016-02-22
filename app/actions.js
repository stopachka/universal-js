export const GET_POSTS = 'GET_POSTS';

export function getPosts() {
  return {
    type: GET_POSTS,
    payload: fetchPosts(),
  };
}

export function getPost(id) {
  return {
    type: GET_POSTS,
    payload: fetchPost(id),
  }
}

// ------------------------------------------------------------
// API

// TODO(stopachka) will fix once cfg is figured out
const API_PATH = process.NODE_ENV === 'production'
  ? 'http://stepanp.com/api'
  : 'http://localhost:5000/api'
;

function fetchPosts() {
  return fetch(`${API_PATH}/posts`)
    .then(r => r.json())
  ;
}

function fetchPost(id) {
  return fetch(`${API_PATH}/posts/${id}`)
    .then(r => r.json())
    .then(post => ({[''+id]: post}))
  ;
}
