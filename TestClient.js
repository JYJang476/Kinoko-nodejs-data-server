const webIo = require('socket.io-client');

const socket = webIo("ws://localhost:3000");

socket.on('connect', () => {
    console.log('connect');
    socket.emit('req_cosdata', "23");

    socket.on('res_cosdata', (data) => {
        console.log(data);
    });

    socket.on('error', (data) => {
        console.log(data);
    });

});
