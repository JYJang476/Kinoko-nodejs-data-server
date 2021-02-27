const axios = require('axios');
const { Socket } = require('dgram');
const mainServer = require('./kinokoServer');
const http = require('http').createServer();

const pyIo = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credential: true 
    }
});

class PythonSideEventListner {
    constructor(socket) {
        pyIo.listen(3001);

        pyIo.on('connection', function(sock) {    
            console.log('connect');
            // 파이썬 소켓 초기화
            socket.python = sock;

            // 기기 배지 유무 변경
            // 배지 데이터 반환
            socket.python.on('res_cosdata', (request) => {
                // 웹 소켓 접속 상태 확인
                if(socket.web == undefined)
                    socket.python.emit('error', JSON.stringify({
                        code: 401,
                        message: "웹과 연결이 되지 앟음"
                    }));
                else {
                    console.log(request);
                    // 웹으로 데이터 전송
                    socket.web.emit('res_cosdata', request);
                }
            });
            
            socket.python.on('res_image', (request) => {
                // 웹 소켓 접속 상태 확인
                if(socket.web == undefined)
                    socket.python.emit('error', JSON.stringify({
                        code: 401,
                        message: "웹과 연결이 되지 앟음"
                    }));
                else {
                    console.log(request);
                    // 웹으로 데이터 전송
                    socket.web.emit('res_image', request);
                }
            });

            socket.python.on('res_3ddata', (request) => {
                // 웹 소켓 접속 상태 확인
                if(socket.web == undefined)
                    socket.python.emit('error', JSON.stringify({
                        code: 401,
                        message: "웹과 연결이 되지 앟음"
                    }));
                else {
                    console.log(request);
                    // 웹으로 데이터 전송
                    socket.web.emit('res_3ddata', request);
                }
            });

            
            socket.python.on('res_video', (request) => {
                // 웹 소켓 접속 상태 확인
                if(socket.web == undefined)
                    socket.python.emit('error', JSON.stringify({
                        code: 401,
                        message: "웹과 연결이 되지 앟음"
                    }));
                else {
                    console.log(request);
                    // 웹으로 데이터 전송
                    socket.web.emit('res_video', request);
                }
            });

            // 배지 존재 유무
            socket.python.on('res_compost', (request) => {
                // 웹 소켓 접속 상태 확인
                if(socket.web == undefined)
                    socket.python.emit('error', JSON.stringify({
                        code: 401,
                        message: "웹과 연결이 되지 앟음"
                    }));
                else {
                    console.log(request);
                    // 웹으로 데이터 전송
                    socket.web.emit('res_compost', request);
                }
            });
        });
    }
}

module.exports = PythonSideEventListner;