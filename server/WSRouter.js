const emitter = require("events");

class WSRouter {
    _emitter;
    constructor() {
        this._emitter = new emitter();
    }
    addEventHandler(event, handler) {
        this._emitter.on(event, handler);
    }
    processTheEvent(wss, ws, mes, ...args) {
        this._emitter.emit(mes.event, wss, ws, mes.data, ...args);
    }
};

module.exports = WSRouter; 