import React, { useState } from 'react'
import s from "./Messages.module.css"

export default function Messages({sendMes, messages}) {
    const [text, setText] = useState("");
    
    return (
        <div className={s.messages_container}>
            <form className={s.send_from}>
                <input className={s.message_input} type="text" value={text} onInput={(e) => setText(e.target.value)} />
                <button className={s.message_send} onClick={(e) => {
                    e.preventDefault();
                    sendMes(text);
                    setText("");
                }} type='submit'>Отправить</button>
            </form>
            <ul className={s.messages}>
                {
                    messages.map((ms) => 
                        <li className={s.message} key={ms.id}>
                            <span className={s.name}>{ms.name}</span>: <span className={s.text}>{ms.text}</span>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
