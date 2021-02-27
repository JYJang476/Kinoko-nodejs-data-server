const webIo = require('socket.io-client');

const socket = webIo("ws://localhost:3001");

socket.on('connect', () => {
    console.log('connect');

    socket.on('req_cosdata', (data) => {
        let sndData = JSON.stringify({
            temperature: 30,
            humidity: 25
        });

        socket.emit('res_cosdata', data);
    });

    socket.on('req_image', (data) => {
        let sndData = JSON.stringify({
            temperature: 30,
            humidity: 25
        });

        socket.emit('res_image', data);
    });
});
