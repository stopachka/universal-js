import {Route, IndexRoute} from 'react-router';
import React from 'react';

import {App, PostIndex, PostShow} from './components';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostIndex} />
    <Route path=":id" component={PostShow} />
  </Route>
);
