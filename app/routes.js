import {Route} from 'react-router';
import React from 'react';

const App = React.createClass({
  render() {
    return <span>Hi there!</span>;
  }
});

export default (
  <Route path="/" component={App}>
  </Route>
);
