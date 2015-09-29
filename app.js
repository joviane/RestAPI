var express = require('express');
var app = express();

app.get('/aulas', function(req, res) {
  res.send('Ae!');
});

var server = app.listen(3000, function() {
  console.log('Servidor rodando em: localhost:3000');
});
