import {match, browserHistory, Router} from 'react-router';
import {Provider} from 'react-redux';
import createStore from './create-store';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';

const store = createStore(window.__DATA__);

match({history: browserHistory, routes}, (err, redirect, props) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router
        createElement={createElement}
        onUpdate={() => window.scrollTo(0, 0)}
        {...props}
      />
    </Provider>,
    document.getElementById('react-root'),
  );
});

function createElement(Comp, props) {
  Comp.fetchData && Comp.fetchData(store, props);
  return <Comp {...props} />;
}
