const axios = require('axios');

class WebSideEventListner {
    WebSock = null;    
    WebSideEventListner(sock) {
        WebSock = sock;
    }

    RequestCompostData(request) {
        request.emit(request);

        this.WebSock.on("compost/data", this.ResponseCompostData);
   }

    ResponseCompostData(request) {
        request.emit(request);
    }

    RequestCompost3D(request) {
        request.emit(request);
    }
}