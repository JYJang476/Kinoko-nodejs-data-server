const axios = require('axios');
const mainServer = require('./kinokoServer');
const http = require('http').createServer(3051);

const arduinoIo = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credential: true 
    }
});

class ArduinoSideEventListner {
    constructor(socket) {
        webIo.listen(3002);
        
        webIo.on('connection', function(sock) {    
            console.log('connect');
            // 웹 접속 소켓 초기화
            sock.on('arduino_conn', (data) => {
                sock.emit('success');
                socket.web = sock;
            });

            sock.on('live/farm/data', (data) => {
                sock.emit("req_data", JSON.stringify({
                    temp: 30,
                    hi: 100
                }));
            });

            sock.on('live/farm/data', (data) => {
                sock.emit("req_data", "23");
            });
        });
    }

    Listen() {
        ArduinoSock.on('myfarm_status', RequestSetStatus);
        ArduinoSock.on('mushimg_upload', RequestSetStatus);
        ArduinoSock.on('compost_upload', UploadCompostImage);
    }

    // 배지 이미지 업로드 요청을 받음
    UploadCompostImage(request) {
        axios({
            url: "image/upload",
            method: "post",
            params: request
        }).then(() => {
            ArduinoSock.emit('success');
        });
    } 

    // 3D 데이터 반환요청을 받았을 경우
    ResponseCompost3D(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            ArduinoSock.emit('success');
        });
    }

    // 온,습도 데이터 반환 요청 받았을 경우
    ResponseCompostData(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            ArduinoSock.emit('success');
        });
    }

    // 기기 가동상태 변경 요청을 받았을 때
    RequestSetStatus(request) {
        axios({
            url: "myfarm/status",
            method: "put",
            params: request
        }).then(() => {
            ArduinoSock.emit('success');
        });
    }
}