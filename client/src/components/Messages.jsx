import React, { useState } from 'react'

export default function Messages({sendMes, messages}) {
    const [text, setText] = useState("");
    
    return (
        <div>
            <div>
                <input type="text" value={text} onInput={(e) => setText(e.target.value)} />
                <button onClick={(e) => {
                    sendMes(text);
                    setText("");
                }} type='button'>Отправить</button>
            </div>
            <ul>
                {
                    messages.map((ms) => 
                        <li key={ms.id}>{ms.name}:{ms.text}</li>
                    )
                }
            </ul>
        </div>
    )
}
