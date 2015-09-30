var express = require('express');
var app = express();

app.get('/aulas', function(req, res) {
  var mysql = require('mysql');

  var connection = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'homolog'
  });

  var query = 'select s.nome as sala, c.codigo as curso, d.dias as dia, h.nome as horario from Sala s, Curso c, Turma t, Turma_dias d, InstrutorEmAula i, Horario h where c.id = t.curso_id and t.sala_id = s.id and t.id = i.turma_id and t.id = d.turma_id and t.horario_id = h.id';

  connection.query(query, function(err, result, fields) {
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
