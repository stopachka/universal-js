import {Route} from 'react-router';
import React from 'react';

const App = React.createClass({
  render() {
    return <div>hello</div>;
  },
});

export default (
  <Route path="/" component={App}>
  </Route>
);
