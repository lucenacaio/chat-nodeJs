/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(3000, function() {
    console.log('Servidor online');
})

var io = require('socket.io').listen(server);

app.set('io', io);

/* criar a conexão por websocket */
io.on('connection', function(socket) {

    socket.on('disconnect', function(data) {
        socket.broadcast.emit(
            'msgParaCliente', { apelido: socket.name, mensagem: "Saiu do chat" }
        );
    });

    socket.on('join', function(name) {
        socket.name = name;
    });

    socket.on('msgParaServidor', function(data) {
        socket.emit(
            'msgParaCliente', { apelido: 'Você', mensagem: data.mensagem, estilo: 'self' }
        );

        socket.broadcast.emit(
            'msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem, estilo: 'other' }
        );
    });

    socket.on("enviado", function(data) {
        socket.broadcast.emit("enviado", data);
    });
    socket.on("recebido", function() {
        socket.broadcast.emit("recebido");
    });

});