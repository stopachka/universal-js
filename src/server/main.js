import {RouterContext, match} from 'react-router';
import express from 'express';
import React from 'react';
import routes from '../shared/routes';

const app = express();

app.get('/:params?*', (req, res) => {
  match({routes, location: req.url}, (err, redirect, props) => {
    res.status(200).send(templ(React.renderToString(<RouterContext {...props} />)));
  });
});

app.listen(4000);

// ------------------------------------------------------------
// Helpers

function templ(body) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        ${body}
      </body>
    </html>
  `
};
