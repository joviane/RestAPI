var express = require('express');
var app = express();

var formataData = function(data) {
  var result = data.getUTCDate() + '/' + (data.getUTCMonth() + 1) + '/' + data.getUTCFullYear();

  return result;
};
var pegarDiaDaSemana = function(data) {
  var diaDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  return diaDaSemana[data.getUTCDay()];
};

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
    result.forEach(function(element) {
      var horario = {};
      var data = new Date(element.dia);

      element.sala = element.sala.replace('Sala ', '');
      element.dia = formataData(data);

      var horarioArray = element.horario.replace(/Manhã \(|Tarde \(|Integral \(|Noturno \(|Sabado \(|Domingo \(/, '').replace(')', '').split(' as ');
      horario.inicio = horarioArray[0];
      horario.fim = horarioArray[1];
      element.horario = horario;

      element.diaDaSemana = pegarDiaDaSemana(data);
    });

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
