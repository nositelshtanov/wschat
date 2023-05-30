module.exports = {
    auth: (wss, ws, mesData, additionallyData) => {
        if ([...wss.clients].filter(c => c.name === mesData).length == 0) {
            ws.name = mesData;
            ws.send(JSON.stringify({event: "rooms", data: additionallyData.rooms}));
            ws.send(JSON.stringify({event: "authSuc", data: true}));
        } else {
            ws.send(JSON.stringify({event: "authSuc", data: false}));
        }
    },
    sendMes: (wss, ws, mesData) => {
        const newMessage = {
            event: "sendMes",
            data: {
                id: Date.now(),
                name: ws.name,
                text: mesData.text
            }
        };
    
        wss.clients.forEach((client) => {
            if (client.room === ws.room) {
                client.send(JSON.stringify(newMessage));
            }
        });
    },
    createRoom: (wss, ws, mesData, additionallyData) => {
        const newMessage = {
            event: "joined",
            data: {
                name: ws.name,
                id: Date.now(),
                text: `${ws.name} присоеденился к чату`
            }
        };
        const newRoomsMes = {
            event: "rooms",
            data: additionallyData.rooms
        };
    
        if (!additionallyData.rooms.includes(mesData) && mesData !== "") {
            additionallyData.rooms.push(mesData);
            ws.room = mesData;
    
            wss.clients.forEach((client) => {
                if (client.room === ws.room) {
                    client.send(JSON.stringify(newMessage));
                }
            });
    
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(newRoomsMes));
            });
            
            const membersMess = {
                event: "members",
                data: [...wss.clients].filter((client) => client.room == ws.room).map(client => client.name)
            };
    
            ws.send(JSON.stringify(membersMess));
        }
    },
    joinRoom: (wss, ws, mesData, additionallyData) => {
        const newMess = {
            event: "joined",
            data: {
                name: ws.name,
                id: Date.now(),
                text: `${ws.name} присоеденился к чату`
            }
        };
    
        if (additionallyData.rooms.includes(mesData)) {
            ws.room = mesData;
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
    },
    leaveRoom: (wss, ws, mesData, additionallyData) => {
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
            data: additionallyData.rooms
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
    },
};