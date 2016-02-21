import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {RouterContext, match} from 'react-router';
import createStore from './create-store';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import routes from './routes';

const app = express();

// ------------------------------------------------------------
// API

import POSTS from '../posts';

app.get('/api/posts', (req, res) => {
  res.status(200).send(JSON.stringify(POSTS));
});

app.get('/api/posts/:id', (req, res) => {
  res.status(200).send(JSON.stringify(POSTS[req.params.id]));
});

// ------------------------------------------------------------
// Static

app.get('/client.js', (req, res) => {
  res.sendFile('client.js', {root: 'build'});
});

app.get('/favicon.ico', (req, res) => {
  res.status(500).send('uh oh');
});

app.get('/:params?*', (req, res) => {
  match({routes, location: req.url}, async function(err, redirect, props) {
    if (err) {
      res.status(500).send(error.messsage);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else {
      // const data = await fetchAllData();
      const store = createStore();
      res.status(200).send(
        templ(
          renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          ),
          {},
        ),
      );
    }
  });
});

app.listen(process.env.PORT || 5000);

// ------------------------------------------------------------
// Helpers

function templ(body, data) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="http://fast.fonts.net/jsapi/15046032-4cb8-4f35-b794-7d6caf755c60.js"></script>
      </head>
      <body>
        <div id="react-root">${body}</div>
        <script>
          window.__DATA__ = ${JSON.stringify(data)};
        </script>
        <script
          src="${
            // stopachka(TODO) ahh need a cfg, or inital state
            process.env.NODE_ENV === 'production'
              ? '../../client.js'
              : 'http://localhost:3000/build/client.js'
          }">
        </script>
      </body>
    </html>
  `;
}

async function fetchAllData(props) {
  return Promise.all(
    props.components.filter(x => x.fetchData).map(x => x.fetchData(props))
  ).then(xs => xs.reduce(
    (data, x) => ({...data, ...x}),
    {},
  ));
}
