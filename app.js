/* Import das configurações do servidor */
var app = require('./config/server');

/* Porta de acesso ao server */
app.listen(3000, function() {
    console.log("Servidor online");
});