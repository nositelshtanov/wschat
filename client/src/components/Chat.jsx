import React, { useState } from 'react'
import s from "./Chat.module.css"
import Auth from './Auth';
import Rooms from './Rooms';
import CreateRoom from './CreateRoom';
import ChatInfo from './ChatInfo';
import Messages from './Messages';
import Leave from './Leave';
import useWSChat from '../hooks/useWSChat';

export default function Chat() {
    const [name, setName] = useState("");
    const [curRoom, setCurRoom] = useState();
    
    const {
        websock, 
        rooms, 
        isAuth, 
        members, 
        messages, setMessages
    } = useWSChat();

    function onAuth(name) {
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

    function sendMes(text) {
        const mes = {
            event: "sendMes",
            data: {
                id: Date.now(),
                name: name,
                text: text
            }
        };

        websock.current.send(JSON.stringify(mes));
    }

    function createRoom(roomName) {
        const mes = {
            event: "createRoom",
            data: roomName
        };

        if (roomName === "") return;

        websock.current.send(JSON.stringify(mes));

        setCurRoom(roomName);
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
        <Auth onAuth={onAuth} changeName={(name) => {setName(name)}}/>
    );

    return (
        <div className={s.chat_container}>
            <Rooms rooms={rooms} curRoom={curRoom} chooseRoom={chooseRoom}>
                <CreateRoom curRoom={curRoom} createRoom={createRoom} />
            </Rooms>
            <div >
            { curRoom && 
                <div className={s.cur_room_chat}>
                    <h3 className={s.cur_room_h3}>Комната: {curRoom}</h3>
                    <div className={s.leaveBtn}>
                        <Leave leaveRoom={leaveRoom} /> 
                    </div>
                    <ChatInfo members={members} />
                    <Messages messages={messages} sendMes={sendMes} />
                </div>
            }
            </div>
        </div>
    );
}
