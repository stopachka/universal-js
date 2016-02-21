import routes from './routes';
import React from 'react';
import ReactDOM from 'react-dom';
import {match, browserHistory, Router} from 'react-router';

match({history: browserHistory, routes}, (err, redirect, props) => {
  ReactDOM.render(
    <Router
      createElement={createElement}
      onUpdate={() => window.scrollTo(0, 0)}
      {...props}
    />,
    document.getElementById('react-root')
  );
});

function createElement(Comp, props) {
  Comp.fetchData && Comp.fetchData(props);
  return <Comp {...props} />;
}
