import React, { useEffect, useRef, useState } from 'react'
import s from "./Chat.module.css"

export default function Chat() {
    const websock = useRef();
    const [isAuth, setIsAuth] = useState(false);
    const [name, setName] = useState("");
    const [rooms, setRooms] = useState();
    const [curRoom, setCurRoom] = useState();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [roomName, setRoomName] = useState("");
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        websock.current = ws;

        ws.addEventListener("open", (e) => {

        });

        ws.addEventListener("message", (e) => {
            const mes = JSON.parse(e.data);

            switch (mes.event) {
                case "rooms":
                    setRooms(mes.data);
                break;
                case "authSuc":
                    setIsAuth(mes.data);
                    console.log(mes.data);
                break;
                case "joined":
                    console.log(mes.data);
                    setMessages(prev => [mes.data, ...prev]);
                break;
                case "sendMes":
                    console.log(mes.data);
                    setMessages(prev => [mes.data, ...prev]);
                break;
                case "members":
                    setMembers(mes.data);
                break;
                default:
                    console.log("неизвестное сообщение");
                break;
            }
        });

        ws.onerror = function(e) {
            alert("ошибка", e);
        }
    }, []);

    function onAuth(e) {
        const mes = {
            event: "auth",
            data: name
        };

        websock.current.send(JSON.stringify(mes));
    }

    function chooseRoom(room) {
        const mes = {
            event: "joinRoom",
            data: room
        };

        websock.current.send(JSON.stringify(mes));

        setCurRoom(room);
    }

    function sendMes(e) {
        const mes = {
            event: "sendMes",
            data: {
                id: Date.now(),
                name: name,
                text: text
            }
        };

        websock.current.send(JSON.stringify(mes));

        setText("");
    }

    function createRoom(e) {
        const mes = {
            event: "createRoom",
            data: roomName
        };

        if (roomName === "") return;

        websock.current.send(JSON.stringify(mes));

        setCurRoom(roomName);
        setRoomName("");
    }

    function leaveRoom(e) {
        const mes = {
            event: "leaveRoom"
        };

        websock.current.send(JSON.stringify(mes));

        setCurRoom(undefined);
        setMessages([]);
    }

    if (!isAuth) return (
        <div>
            <input onInput={(e) => setName(e.target.value)} value={name} type="text" placeholder='Введите свое имя' />
            <button onClick={onAuth} type='button'>Авторизоваться</button>
        </div>
    );

    return (
        <div>
            <ul>
            { !curRoom &&
                <li>
                    <input value={roomName} onInput={(e) => setRoomName(e.target.value)} type="text" placeholder='' />
                    <button type='button' onClick={createRoom}>Создать комнату</button>
                </li>
            }
            { rooms && !curRoom &&
                rooms.map(room => 
                    <li key={room}>
                        <button type='button' onClick={(e) => chooseRoom(room)}>
                            {room}
                        </button>
                    </li>    
                )
            }
            </ul>
            <div>
            { curRoom && 
                <div>
                    <h3>{curRoom}</h3>
                    <div>
                        <button type='button' onClick={leaveRoom}>Выйти</button>
                    </div>
                    <div>
                        Участники:
                        <ul>
                            {
                                members.map(member => 
                                    <li key={member}>{member}</li>
                                )
                            }    
                        </ul>
                    </div>
                    <div>
                        <input type="text" value={text} onInput={(e) => setText(e.target.value)} />
                        <button onClick={sendMes} type='button'>Отправить</button>
                    </div>
                    <ul>
                        {
                            messages.map((ms) => 
                                <li key={ms.id}>{ms.name}:{ms.text}</li>
                            )
                        }
                    </ul>
                </div>
            }
            </div>
        </div>
    );
}
