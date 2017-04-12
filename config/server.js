/* Import dos módulos */
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

/* Inicialização do express */
var app = express();

/* Setar 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* Configuração dos middlewares */
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

/* Autoload das rotas, models e controllers */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* Exportação do módulo do express */
module.exports = app;