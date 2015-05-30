import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './views/app.jsx';
import Home from './views/home.jsx';
import Info from './views/info.jsx';
import Test from './views/test.jsx';
import NotFound from './views/notFound.jsx';

var routes = (
  <Route name="app" path="/" location="history" handler={ App }>
    <Route name="info" location="history" handler={ Info } />
    <Route name="home" location="history" handler={ Home } />
    <Route name="test" location="history" handler={ Test } />
    <DefaultRoute handler={ Home } />
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

module.exports = routes;
