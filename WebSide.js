const axios = require('axios');
const { isUndefined } = require('util');
const mainServer = require('./kinokoServer');
const http = require('http').createServer(3000);

const webIo = require('socket.io')(http, {
    cors: {
        methods: ["GET", "POST"],
        credential: true 
    }    
});
class WebSideEventListner {
    constructor(socket) {
        webIo.listen(3000);
        webIo.on('connection', function(sock) {    
            console.log('connect');
            socket.web = sock;
            
            // 배지 데이터 요청
            socket.web.on('req_cosdata', (request) => {
                // 하드웨어 소켓 접속 상태 확인
                if(typeof socket.python == "undefined") {
                    socket.web.emit('error', JSON.stringify({
                        code: 401,
                        message: "기기와 연결이 되지 앟음"
                    }));
                    return;
                }
                console.log('req_cosdata');
                // 하드웨어에 요청
                socket.python.emit("req_cosdata", request);
                
                // 하드웨어 메세지 대기
                socket.python.on("res_cosdata", (data) => {
                    socket.web.emit("req_cosdata", data);
                });
            });
        
            // 배지 3D 데이터 요청
            socket.web.on('req_cos3d', (request) => {
                // 하드웨어 소켓 접속 상태 확인
                if(typeof socket.python == "undefined") {
                    socket.web.emit('error', JSON.stringify({
                        code: 401,
                        message: "기기와 연결이 되지 않음"
                    }));
                } else {
                    // 하드웨어에 데이터 요청
                    socket.python.emit('req_3ddata', request);
            
                    // 응답 대기
                    socket.web.on('res_3ddata', (data) => {
                        socket.web.emit("req_cosdata", data);
                    });
                }
            });

            // 배지 이미지 요청
            socket.web.on('req_image', (request) => {
                // 하드웨어 소켓 접속 상태 확인
                if(typeof socket.python == "undefined") {
                    socket.web.emit('error', JSON.stringify({
                        code: 401,
                        message: "기기와 연결이 되지 않음"
                    }));
                } else {
         
                    // 하드웨어에 데이터 요청
                    socket.python.emit('req_image', request);
            
                    // 응답 대기
                    socket.web.on('res_image', (data) => {
                        socket.web.emit("req_image", data);
                    });
                }
            });

            // 배지 영상 요청
            socket.web.on('req_video', (request) => {
                console.log(request);
                // 하드웨어 소켓 접속 상태 확인
                if(typeof socket.python == "undefined") {
                    socket.web.emit('error', JSON.stringify({
                        code: 401,
                        message: "기기와 연결이 되지 않음"
                    }));
                } else {
            
                    // 하드웨어에 데이터 요청
                    socket.python.emit('req_video', request);
                    
                    // 응답 대기
                    socket.web.on('res_video', (data) => {
                        socket.web.emit("res_video", data);
                    });
                }
            });

            // 배지 확인
            socket.web.on('req_compost', (request) => {
                console.log(request);
                // 하드웨어 소켓 접속 상태 확인
                if(typeof socket.python == "undefined") {
                    socket.web.emit('error', JSON.stringify({
                        code: 401,
                        message: "기기와 연결이 되지 않음"
                    }));
                } else {
            
                    // 하드웨어에 데이터 요청
                    socket.python.emit('req_compost', request);
                    
                    // 응답 대기
                    socket.web.on('res_compost', (data) => {
                        socket.web.emit("res_compost", data);
                    });
                }
            });

            socket.web.on('disconnect', (data) => {
                // 하드웨어 소켓 접속 상태 확인
                if(typeof socket.python == "undefined") {
                    socket.web.emit('error', JSON.stringify({
                        code: 401,
                        message: "기기와 연결이 되지 않음"
                    }));
                } else {
                    socket.python.emit('close', data);
                }
            });
        });
    }
}

module.exports = WebSideEventListner;