const axios = require('axios');
const { Socket } = require('dgram');
const mainServer = require('./kinokoServer');
const http = require('http').createServer(3051);

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
            // 버섯 이미지 업로드
            // socket.python.on('upload_mushimg', this.UploadMushroomImage);
            // // 버섯 크기 변경
            // socket.python.on('set_mushsize', this.SetMushroomSize);
            // // 버섯 추가
            // socket.python.on('add_mushroom', this.UploadMushroomImage);
            // // 버섯 상태 변경
            // socket.python.on('set_mushroom', this.SetMushroomStatus);
            // // 3D 데이터 전송
            // socket.python.on('upload_mushimg', this.UploadMushroomImage);
            // // 버섯 정보 변경
            // socket.python.on('set_mushdata', this.SetMushroomInfo);
            // 기기 상태 변경

            // 기기 배지 유무 변경

            // 배지 데이터 반환
            socket.python.on('res_cosdata', (request) => {
                // 웹 소켓 접속 상태 확인
                if(socket.web == undefined)
                    socket.python.emit('error', JSON.stringify({
                        code: 401,
                        message: "웹과 연결이 되지 앟음"
                    }));
        
                // 웹으로 데이터 전송
                socket.web.emit('res_cosdata', request);
            });
        });
    }

    // 배지 데이터 반환
    ResponseCompostData(request) {
        // 웹 소켓 접속 상태 확인
        if(socket.web == undefined)
            socket.python.emit('error', JSON.stringify({
                code: 401,
                message: "웹과 연결이 되지 앟음"
            }));

        // 웹으로 데이터 전송
        socket.web.emit('res_data', request);
    }

    // 버섯 이미지 업로드
    // param : 버섯 id, 이미지 데이터
    UploadMushroomImage(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            sock.emit('success');
        });
    }

    // 버섯의 크기 조정
    // parma : 버섯 id, 크기
    SetMushroomSize(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            sock.emit('success');
        });
    }

    // 새로운 버섯 추가
    AddMushroom(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            sock.emit('success');
        });
    }

    // 버섯 상태 변경
    SetMushroomStatus(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            sock.emit('success');
        });
    }

    // 버섯 정보 변경
    SetMushroomInfo(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            sock.emit('success');
        });
    }
}

module.exports = PythonSideEventListner;