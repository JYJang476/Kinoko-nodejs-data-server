

const WebSideEventListner = require('./WebSide');
const WebSide = require('./WebSide');
const PythonSide = require('./PythonSide');
const PythonSideEventListner = require('./PythonSide');
// const ArduinoSide = require('./ArduinoSide');

class kinokoServer {
    constructor() {
        this.socketObj = {
            web: undefined,
            python: undefined
        };
    }

    Listen() {
        this.webObj = new WebSideEventListner(this.socketObj);
        this.pyObj = new PythonSideEventListner(this.socketObj);
    }
}

kinoko = new kinokoServer();
kinoko.Listen();


// io.on('connection', function(sock) {    
//     // // 아두이노 접속 소켓 초기화
//     // sock.on('arduino_conn', (data) => {
//     //     sock.emit('success');
//     //     ardunioSock = sock;
//     // });

//     // 웹 접속 소켓 초기화
//     sock.on('web_conn', (data) => {
//         sock.emit('success');
//         webSock = sock;
//     });

//     // // 파이썬 접속 소켓 초기화
//     // sock.on('python_conn', (data) => {
//     //     sock.emit('success');
//     //     pythonSock = sock;
//     // });
// });