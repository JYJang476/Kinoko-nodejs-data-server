

const WebSideEventListner = require('./WebSide');
const WebSide = require('./WebSide');
const PythonSide = require('./PythonSide');
const PythonSideEventListner = require('./PythonSide');
const PlySideEventListner = require('./3DSide');
const PlySide = require('./3DSide');

class kinokoServer {
    constructor() {
        this.socketObj = {
            web: undefined,
            python: undefined,
            ply: undefined
        };
    }

    Listen() {
        this.webObj = new WebSideEventListner(this.socketObj);
        this.pyObj = new PythonSideEventListner(this.socketObj);
        this.plyObj = new PlySideEventListner(this.socketObj);
    }
}

kinoko = new kinokoServer();
kinoko.Listen();

