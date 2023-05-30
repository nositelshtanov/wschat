const {WebSocketServer} = require("ws");
const WSRouter = require("./WSRouter");
const controllers = require("./controllers");

const PORT = 8080;

const wss = new WebSocketServer({port: PORT}, () => {console.log("сервер поднялся на " + PORT + " порту")});
const wsrouter = new WSRouter();

const rooms = ["main"];

wsrouter.addEventHandler("auth", controllers.auth);
wsrouter.addEventHandler("sendMes", controllers.sendMes);
wsrouter.addEventHandler("createRoom", controllers.createRoom);
wsrouter.addEventHandler("joinRoom", controllers.joinRoom);
wsrouter.addEventHandler("leaveRoom", controllers.leaveRoom);

wss.on("connection", function(ws) {
    ws.on("message", function(data) {
        const mes = JSON.parse(data);

        wsrouter.processTheEvent(wss, ws, mes, {rooms});
    });

    ws.on("error", function(code, reason) {
        console.log("err", code, reason);
    });
});

wss.on("close", () => {
    console.log("веб сокет сервер закрыт");
});

//  incomMes = {
//     event: "connet to room / sendMessage / auth / createRoom / leaveRoom",
//     data: "room name / {name, id, text} / name / roomName / {}"
// };

//  outgoingMes = {
//     event: "rooms / joined  / members / authSuc",
//     data: "['', ''] / {name, id, text} / ['', ''] / - /"
// }
