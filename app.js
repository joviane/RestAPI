var express = require('express');
var app = express();

app.get('/aulas', function(req, res) {
  var mysql = require('mysql');

  var connection = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'caelumweb2'
  });

  connection.query('select * from Sala', function(err, result, fields) {
    res.send(result);
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  if (host == '::') {
    host = 'localhost';
  };

  console.log('Servidor rodando em ... ' + host + ':' + port);
});
