import React, { useState } from 'react'

export default function CreateRoom({curRoom, createRoom}) {
    const [roomName, setRoomName] = useState("");

    return (
        !curRoom &&
            <li>
                <input value={roomName} onInput={(e) => setRoomName(e.target.value)} type="text" placeholder='' />
                <button type='button' onClick={(e) => {
                    createRoom(roomName);
                    setRoomName("");
                }}>Создать комнату</button>
            </li>
    );
}
