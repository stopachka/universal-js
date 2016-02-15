var express = require('express');

var app = express();
app.get('/', function(req, res) {
  return res.send('yo');
});

console.log('Listening on port 4000...');
app.listen(4000);
