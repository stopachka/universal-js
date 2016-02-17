import {renderToString} from 'react-dom/server';
import {RouterContext, match} from 'react-router';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';

import routes from './routes';

const app = express();

// ------------------------------------------------------------
// Static

app.use('/client.js', (req, res) => {
  res.sendFile('client.js', {root: 'build'});
});

app.get('/:params?*', (req, res) => {
  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).send(error.messsage);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else {
      res.status(200).send(templ(renderToString(<RouterContext {...props} />)));
    }
  });
});

app.listen(process.env.PORT || 5000);

// ------------------------------------------------------------
// Helpers

function templ(body) {
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
