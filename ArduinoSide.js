const axios = require('axios');

class ArduinoSideEventListner {
    ArduinoSock = null;

    ArduinoSideEventListner(sock) {
        ArduinoSock = sock;

        sock.on('myfarm_status', RequestSetStatus);
    }

    // 업로드 요청을 받음
    UploadCompostImage(request) {
        axios({
            url: "image/upload",
            method: "post",
            params: request
        }).then(() => {
            ArduinoSock.emit('success');
        });
    }

    ResponseCompost3D(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            ArduinoSock.emit('success');
        });
    }

    ResponseCompostData(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            ArduinoSock.emit('success');
        });
    }

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