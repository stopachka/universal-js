import routes from './routes';
import React from 'react';
import ReactDOM from 'react-dom';
import {match, browserHistory, Router} from 'react-router';

match({history: browserHistory, routes}, (err, redirect, props) => {
  ReactDOM.render(
    <Router {...props} />,
    document.getElementById('react-root')
  );
});
