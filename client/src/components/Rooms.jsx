import React from 'react'
import s from "./Rooms.module.css"

export default function Rooms({rooms, curRoom, chooseRoom, children}) {
    return (
        rooms && !curRoom &&
        <div className={s.rooms_container}>
            <h2 className={s.rooms_list_h2}>Список комнат</h2>
            {children}
            <ul className={s.rooms_list}>
                {rooms.map(room => 
                    <li key={room} className={s.room_item}>
                        <button className={s.room_btn} type='button' onClick={(e) => chooseRoom(room)}>
                            {room}
                        </button>
                    </li>    
                )}
            </ul>
        </div>
    )
}
