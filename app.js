/* Import das configurações do servidor */
var app = require('./config/server');

/* Porta de acesso ao server */
var server = app.listen(3000, function() {
    console.log("Servidor online");
});

/* Servidor Socket*/
var io = require('socket.io').listen(server);

app.set('io', io);

/* Criar conexão por websocket */
io.on('connection', function(socket) {
    console.log('Usuário Conectou');

    socket.on('disconnect', function() {
        console.log("O usuário desconectou");
    });

});