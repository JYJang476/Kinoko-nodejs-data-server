const axios = require('axios');

class PythonSideEventListner {
    PythonSock = null;    
    PythonSideEventListner(sock) {
        PythonSock = sock;
    }

    UploadMushroomImage(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            sock.emit('success');
        });
    }

    SetMushroomSize(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            sock.emit('success');
        });
    }

    AddMushroom(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            sock.emit('success');
        });
    }

    SetMushroomStatus(request) {
        axios({
            url: "미정",
            method: "post",
            params: request
        }).then(() => {
            sock.emit('success');
        });
    }

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