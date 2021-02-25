const webIo = require('socket.io-client');

const socket = webIo("ws://localhost:3000");

socket.on('connect', () => {
    console.log('connect');
    // 온, 습도 데이터 요청
    socket.emit('req_cosdata', "23");
    // 온, 습도 데이터 받아오는 이벤트
    socket.on('res_cosdata', (data) => {
        console.log(data);
    });
    
    socket.on('error', (data) => {
        console.log(data);
    });

});
