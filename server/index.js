const {WebSocketServer} = require("ws");

const PORT = 8080;

const wss = new WebSocketServer({port: PORT}, () => {console.log("сервер поднялся на " + PORT + " порту")});

const rooms = ["main"];

wss.on("connection", function(ws) {
    ws.on("message", function(data) {
        const mes = JSON.parse(data);

        switch (mes.event) {
            case "auth":
                if ([...wss.clients].filter(c => c.name === mes.data).length == 0) {
                    ws.name = mes.data;
                    ws.send(JSON.stringify({event: "rooms", data: rooms}));
                    ws.send(JSON.stringify({event: "authSuc", data: true}));
                } else {
                    ws.send(JSON.stringify({event: "authSuc", data: false}));
                }
            break;
            case "sendMes":
                const newMes = {
                    event: "sendMes",
                    data: {
                        id: Date.now(),
                        name: ws.name,
                        text: mes.data.text
                    }
                };

                wss.clients.forEach((client) => {
                    if (client.room === ws.room) {
                        client.send(JSON.stringify(newMes));
                    }
                });
            break;
            case "createRoom":
                const newMessage = {
                    event: "joined",
                    data: {
                        name: ws.name,
                        id: Date.now(),
                        text: `${ws.name} присоеденился к чату`
                    }
                };
                const newRoom = {
                    event: "rooms",
                    data: rooms
                };

                if (!rooms.includes(mes.data) && mes.data !== "") {
                    rooms.push(mes.data);
                    ws.room = mes.data;
                    wss.clients.forEach((client) => {
                        if (client.room === ws.room) {
                            client.send(JSON.stringify(newMessage));
                        }
                    });
                    wss.clients.forEach((client) => {
                        client.send(JSON.stringify(newRoom))
                    });
                    
                    const membersMess = {
                        event: "members",
                        data: [...wss.clients].filter((client) => client.room == ws.room).map(client => client.name)
                    };

                    ws.send(JSON.stringify(membersMess));
                }
            break;
            case "joinRoom":
                const newMess = {
                    event: "joined",
                    data: {
                        name: ws.name,
                        id: Date.now(),
                        text: `${ws.name} присоеденился к чату`
                    }
                };

                if (rooms.includes(mes.data)) {
                    ws.room = mes.data;
                    wss.clients.forEach((client) => {
                        if (client.room === ws.room) {
                            client.send(JSON.stringify(newMess));
                        }
                    });

                    const membersMess = {
                        event: "members",
                        data: [...wss.clients].filter((client) => client.room == ws.room).map(client => client.name)
                    };

                    wss.clients.forEach(client => {
                        if (client.room === ws.room) {
                            client.send(JSON.stringify(membersMess));
                        }
                    });
                }
            break;
            case "leaveRoom":
                const leavedRoom = ws.room;
                delete ws.room;

                const leaveMes = {
                    event: "sendMes",
                    data: {
                        id: Date.now(),
                        name: ws.name,
                        text: `${ws.name} покинул чат`
                    }
                };
                const leaveSendRoomsMes = {
                    event: "rooms",
                    data: rooms
                };

                wss.clients.forEach((client) => {
                    if (client.room === leavedRoom) {
                        client.send(JSON.stringify(leaveMes));
                    }
                });

                ws.send(JSON.stringify(leaveSendRoomsMes));

                const membersMess = {
                    event: "members",
                    data: [...wss.clients].filter((client) => client.room == leavedRoom).map(client => client.name)
                };

                wss.clients.forEach(client => {
                    if (client.room === leavedRoom) {
                        client.send(JSON.stringify(membersMess));
                    }
                });
            break;
        }
    });

    ws.on("error", function(code, reason) {
        console.log("err", code, reason);
    });
});

wss.on("close", () => {
    console.log("веб сокет сервер закрыт");
});

const mes = {
    event: "connet to room / sendMessage / auth / createRoom / leaveRoom",
    data: "room name / {name, id, text} / name / roomName / {}"
};

const res = {
    event: "rooms / joined  / members / authSuc",
    data: "['', ''] / {name, id, text} / ['', ''] / - /"
}
