import React, { useState } from 'react'

export default function Auth({onAuth, changeName}) {
    const [name, setName] = useState("");

    return (
        <div>
            <input onInput={(e) => {
                setName(e.target.value);
                changeName(e.target.value);
            }} value={name} type="text" placeholder='Введите свое имя' />
            <button onClick={(e) => onAuth(name)} type='button'>Авторизоваться</button>
        </div>
    )
}
