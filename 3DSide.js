const axios = require('axios');
const { isUndefined } = require('util');
const mainServer = require('./kinokoServer');
const http = require('http').createServer(3003);

const webIo = require('socket.io')(http, {
    cors: {
        methods: ["GET", "POST"],
        credential: true 
    }    
});
class PlySideEventListner {
    constructor(socket) {
        webIo.listen(3003);
        webIo.on('connection', function(sock) {    
            console.log('connect');
            socket.ply = sock;
        
            // 배지 3D 데이터 요청
            socket.ply.on('res_cos3d', (request) => {
                // 하드웨어 소켓 접속 상태 확인
                if(typeof socket.web == "undefined") {
                    socket.ply.emit('error', JSON.stringify({
                        code: 401,
                        message: "기기와 연결이 되지 않음"
                    }));
                } else {
                    // 하드웨어에 데이터 요청
                    socket.web.emit('res_cos3d', request);
                }
            });
        });
    }
}

module.exports = PlySideEventListner;