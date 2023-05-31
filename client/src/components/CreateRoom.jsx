import React, { useState } from 'react'
import s from "./CreateRoom.module.css"

export default function CreateRoom({curRoom, createRoom}) {
    const [roomName, setRoomName] = useState("");

    return (
        !curRoom &&
            <form className={s.container}>
                <input className={s.room_input} value={roomName} onInput={(e) => setRoomName(e.target.value)} type="text" placeholder='Название' />
                <button type='submit' className={s.room_button} onClick={(e) => {
                    e.preventDefault();
                    createRoom(roomName);
                    setRoomName("");
                }}>Создать комнату</button>
            </form>
    );
}
