const express = require('express');
const app = express();

const server = app.listen(3000);
app.use(express.static('public'));

console.log('my server is running');

const socket =require('socket.io');
const io=socket(server);


io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log(`new connection: `+socket.id);

    socket.on('mouseMove', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouseMove', data);                       
        console.log(data);

    }
}
const server_port = process.env.YOUR_PORT || process.env.PORT || 80;
const server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
