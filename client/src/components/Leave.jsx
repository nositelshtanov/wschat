import React from 'react'
import s from "./Leave.module.css"

export default function Leave({leaveRoom}) {
    return (<button className={s.btn} type='button' onClick={leaveRoom}>Выйти</button>)
}
