import React from 'react'

export default function Rooms({rooms, curRoom, chooseRoom, children}) {
    return (
        <ul>
        {children}
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
    )
}
